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
    if (!Array.isArray(JSON.parse(string))) {
      return Promise.reject(new Error('Wrap object in array'));
    }
    const obj = JSON.parse(string);
    // check if missing primary
    if (!obj.find(plan => plan['primary'])) {
      return Promise.reject(new Error('No primary plan'));
    }
    // check if missing price
    if (!obj.every(plan => plan['price'] !== undefined)) {
      return Promise.reject(new Error('No price'));
    }
    return string;
  }
  return Promise.reject(new Error('Not a valid string'));
}

export const initialInputReal = `
[
  {
    "name": "premium",
    "primary": true,
    "general": true,
    "specialist": true,
    "dental": true,
    "physiotherapy": true,
    "chinese medicine": true,
    "price": 388
  },
  {
    "name": "standard",
    "general": true,
    "dental": true,
    "price": 0
  }
]
`;

export const initialInput = `
[{
  "name": "standard",
  "general": true,
  "price": 0
},
{
  "name": "premium",
  "primary": true,
  "general": true,
  "specialist": true,
  "pythsiotherapy": true,
  "price": 388
}]
`;
