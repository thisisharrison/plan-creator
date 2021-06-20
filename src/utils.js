export function prettify(string) {
  const object = JSON.parse(string);
  const prettied = JSON.stringify(object, undefined, 4);
  return prettied;
}

export function jsonIfy(string) {
  return JSON.parse(JSON.stringify(string));
}

export async function isValidJson(string) {
  if (typeof JSON.parse(string) === 'object') {
    return string;
  }
  return Promise.reject(new Error('Not a valid string'));
}
