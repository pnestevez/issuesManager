import { useContext, useState } from 'react';
import { mutate } from 'swr';
import SyncLoader from 'react-spinners/SyncLoader';
// Context
import UserContext from '../context/UserContext';
// Components
import styles from '../styles/Launcher.module.css';
import formStyles from '../styles/Form.module.css';
// Functions
import useFormInput from '../hooks/useFormInput';
import { fetcher, notNull } from '../utils';

export default function Launcher({ tools }) {
  const { user, isLoading, setShowModal } = useContext(UserContext);

  // Handle inputs
  const tool = useFormInput('');
  const title = useFormInput('');
  const description = useFormInput('');
  const [image, setImage] = useState('');
  const type = useFormInput('');
  const newTool = useFormInput('');

  function handleSubmitIssue(e) {
    e.preventDefault();

    // Validate not null input
    if (!notNull(
      tool.value,
      title.value,
      description.value,
      image,
      type.value,
    )
    ) return;

    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/issues`, {
      method: 'POST',
      body: JSON.stringify({
        toolId: tool.value,
        title: title.value,
        description: description.value,
        image,
        type: type.value,
        author: user.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // Mutate data through api request
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/issues`);
        tool.reset();
        title.reset();
        description.reset();
        type.reset('');
      });
  }

  const [isUploaded, setIsUploaded] = useState(true);
  async function uploadFile(e) {
    setIsUploaded(false);
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'ml_default');
    fetch('https://api.cloudinary.com/v1_1/dijkt85bg/upload',
      {
        method: 'POST',
        body: data,
      })
      .then(res => res.json())
      .then(file => {
        setIsUploaded(true);
        setImage(file.secure_url);
      });
  }

  function handleSubmitTool(e) {
    e.preventDefault();

    // Validate not null input
    if (!notNull(newTool.value)) return;

    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/tools`, {
      method: 'POST',
      body: JSON.stringify({
        name: newTool.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // Mutate data through api request
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/tools`);
        newTool.reset();
      });
  }

  return (
    <div className={styles.launcher}>
      {user && user.email
        ? (
          <>
            <div className={styles.issues}>
              <div className={styles.title}>
                Add a new
                {' '}
                <span>issue</span>
              </div>
              <form className={formStyles.form} onSubmit={handleSubmitIssue}>

                <div className={formStyles.section}>
                  <label>Tool</label>
                  <select
                    className={formStyles.input}
                    value={tool.value}
                    onChange={tool.handleChange}
                  >
                    <option value="" disabled>Select tool</option>
                    {tools.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>

                <div className={formStyles.section}>
                  <label>Title</label>
                  <input
                    className={formStyles.input}
                    type="text"
                    value={title.value}
                    onChange={title.handleChange}
                  />
                </div>

                <div className={formStyles.section}>
                  <label>Description</label>
                  <textarea
                    className={formStyles.input}
                    value={description.value}
                    onChange={description.handleChange}
                  />
                </div>

                <div className={formStyles.section}>
                  <label>Image</label>
                  <div className={formStyles.inputBox}>
                    <input
                      className={formStyles.image}
                      type="file"
                      onChange={uploadFile}
                    />
                    <div className={isUploaded ? formStyles.uploaded : formStyles.pending} />
                  </div>
                </div>

                <div className={formStyles.section}>
                  <label>Type</label>
                  <select
                    className={formStyles.input}
                    value={type.value}
                    onChange={type.handleChange}
                  >
                    <option value="" disabled>Select type</option>
                    <option value="feature">Feature</option>
                    <option value="bug">Bug</option>
                  </select>
                </div>

                <button type="submit" className={formStyles.submit} onClick={handleSubmitIssue}>Submit issue</button>

              </form>
            </div>
            <div className={styles.tools}>
              <div className={styles.title}>
                Add a new
                {' '}
                <span>tool</span>
              </div>
              <form className={styles.toolsContainer} onSubmit={handleSubmitTool}>

                <div className={formStyles.section}>
                  <input
                    className={formStyles.input}
                    type="text"
                    value={newTool.value}
                    onChange={newTool.handleChange}
                  />
                </div>

                <button type="submit" onClick={handleSubmitTool}><img src="/pen.svg" alt="send" /></button>
              </form>
            </div>
          </>
        )
        : (
          <div className={styles.notLoggedIn} onClick={() => setShowModal(true)}>
            {isLoading
              ? (
                <SyncLoader
                  size={8}
                  margin={2}
                  color="rgb(130,130,130)"
                  loading
                />
              )
              : (
                <>
                  <img src="login.svg" alt="login" />
                  <h4>Please login</h4>
                  <h5>
                    {' '}
                    to use the
                    <span>issues launcher</span>
                  </h5>
                </>
              )}
          </div>
        )}
    </div>
  );
}
