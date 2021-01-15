const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');

// Models
const supertest = require('supertest');
const db = require('../db');
const { Issue, Tool } = require('../models');
const server = require('../server');

chai.use(chaiProperties);
chai.use(chaiThings);
const { expect } = chai;

describe('▒▒▒▒▒▒ Issues Core REST API tests', () => {
  beforeEach('Synchronize database', () => db.sync({ force: false }));

  describe('▒▒▒▒ Database models', () => {
    describe('▒▒ Issue model', () => {
      it('Has tilte attribute', () => {
        expect(Issue.tableAttributes.title).to.be.an('object');
      });
      it('Has description attribute', () => {
        expect(Issue.tableAttributes.description).to.be.an('object');
      });
      it('Has type attribute', () => {
        expect(Issue.tableAttributes.type).to.be.an('object');
      });

      describe('Validations', () => {
        it('Require author', () => {
          const issue = Issue.build();
          return issue
            .validate()
            .then(() => {
              throw new Error('Promise should have rejected');
            })
            .catch(err => {
              expect(err).to.exist;
              expect(err).to.be.an('error');
              expect(err.errors).to.contain.a.thing.with.properties({
                path: 'author',
                type: 'notNull Violation',
              });
            });
        });
        it('Reject if author is not an email', () => {
          const issue = Issue.build({ author: 'not an email' });
          return issue
            .validate()
            .then(() => {
              throw new Error('Promise should have rejected');
            })
            .catch(err => {
              expect(err).to.exist;
              expect(err).to.be.an('error');
              expect(err.errors).to.contain.a.thing.with.properties({
                path: 'author',
                validatorKey: 'isEmail',
              });
            });
        });
        it('Has "pending" as default status value', () => {
          const issue = Issue.build();
          expect(issue.status).to.be.equal('pending');
        });
      });
      describe('Instance methods', () => {
        let testIssue;
        beforeEach(() => {
          testIssue = Issue.build({
            title: 'Lorem Ipsum',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            type: 'feature',
            image: 'https://res.cloudinary.com/dijkt85bg/image/upload/v1610552898/test_umwhs0.png',
            author: 'author@test.test',
          });
        });
        it('Exist vote & cancelVote methods', () => {
          expect(testIssue.vote).to.be.a('function');
          expect(testIssue.cancelVote).to.be.a('function');
        });
      });
    });

    describe('▒▒ Tool model', () => {
      it('Has name attribute', () => {
        expect(Tool.tableAttributes.name).to.be.an('object');
      });

      describe('Validations', () => {
        it('Require name', () => {
          const tool = Tool.build();
          return tool
            .validate()
            .then(() => {
              throw new Error('Promise should have rejected');
            })
            .catch(err => {
              expect(err).to.exist;
              expect(err).to.be.an('error');
              expect(err.errors).to.contain.a.thing.with.properties({
                path: 'name',
                type: 'notNull Violation',
              });
            });
        });
      });
    });
  });

  describe('▒▒▒▒ API routes', () => {
    let agent;
    beforeEach('Set agent', () => {
      agent = supertest(server);
    });

    describe('▒▒ Tools routes', () => {
      const testToolOne = {
        name: 'Test Tool One',
      };
      let testToolId;

      it('Add a tool and respond with 201 status', () => agent
        .post('/tools')
        .send(testToolOne)
        .expect(201)
        .then(res => {
          const createdTool = res.body;
          return Tool.findByPk(createdTool.id);
        })
        .then(foundTool => {
          testToolId = foundTool.id;
          expect(foundTool.name).to.be.equal(testToolOne.name);
        }));

      it('Serve all tools', () => agent
        .get('/tools')
        .expect(200)
        .then(res => {
          const foundTools = res.body;
          expect(foundTools).to.be.an('array');
          expect(foundTools).to.contain.a.thing.with.property('name', testToolOne.name);
        }));

      it('Delete a tool and respond with 20 status', () => agent
        .delete(`/tools/${testToolId}`)
        .expect(200));
    });

    describe('▒▒ Issues routes', () => {
      const testIssueOne = {
        title: 'Test Issue One',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        type: 'feature',
        image: 'https://res.cloudinary.com/dijkt85bg/image/upload/v1610552898/test_umwhs0.png',
        author: 'author@test.test',
      };
      let testIssueId;

      it('Add an issue and respond with 201 status', () => agent
        .post('/issues')
        .send(testIssueOne)
        .expect(201)
        .then(res => {
          const createdIssue = res.body;
          return Issue.findByPk(createdIssue.id);
        })
        .then(foundIssue => {
          testIssueId = foundIssue.id;
          expect(foundIssue.title).to.be.equal(testIssueOne.title);
        }));
      it('Serve all issues', () => agent
        .get('/issues')
        .expect(200)
        .then(res => {
          const foundIssues = res.body;
          expect(foundIssues).to.be.an('array');
          expect(foundIssues).to.contain.a.thing.with.property('title', testIssueOne.title);
        }));

      it('Serve an issue', () => agent
        .get(`/issues/${testIssueId}`)
        .expect(200)
        .then(res => {
          const foundIssue = res.body;
          expect(foundIssue.title).to.be.equal(testIssueOne.title);
        }));

      it('Respond with 404 when the issue is not found', () => agent
        .get('/issues/invaludId')
        .expect(404));

      it('Reject delete requirement and respond with 401 when the user is not the author of the issue', () => agent
        .delete(`/issues/${testIssueId}`)
        .send({
          author: 'unauthorized@test.test',
        })
        .expect(401));

      it('Successfully delete an issue', () => agent
        .delete(`/issues/${testIssueId}`)
        .send({
          author: 'author@test.test',
        })
        .expect(200)
        .then(res => {
          const foundIssue = res.body;
          expect(foundIssue.id).to.be.equal(testIssueId);
        }));
    });
  });
});
