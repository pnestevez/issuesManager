export function fetcher(...args) {
  return fetch(...args)
    .then(r => r.ok && r.json())
    .then(data => data || null);
}

export function notNull(...args) {
  let validated = true;
  args.forEach((a) => {
    a === '' && (validated = false);
  });
  return validated;
}

export function converter(arr, key) {
  const obj = {};
  arr.forEach(e => { obj[e[key]] = true; });
  return obj;
}
