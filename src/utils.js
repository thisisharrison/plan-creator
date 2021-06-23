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
    const obj = JSON.parse(string);
    // check if object is in array structure
    if (!Array.isArray(obj)) {
      return Promise.reject(new Error('Wrap object in array'));
    }
    // check if missing primary
    if (!obj.find(plan => plan['primary'])) {
      return Promise.reject(new Error('No primary plan'));
    }
    // check if missing price
    if (!obj.every(plan => typeof plan['price'] === 'number')) {
      return Promise.reject(new Error('Missing or incorrect price'));
    }
    // check if non-boolean values in feature
    const nonBoolean = obj.every(plan => {
      return Object.keys(plan).every(key => {
        if (key === 'name' || key === 'price' || key === 'currency' || key === 'duration') {
          return true;
        } else {
          return typeof plan[key] === 'boolean';
        }
      });
    });
    if (!nonBoolean) {
      return Promise.reject(new Error('Plan feature value must be boolean'));
    }
    // check if plan has currency and duration
    const currencyDuration = obj.every(plan => {
      return 'currency' in plan && 'duration' in plan;
    });
    if (!currencyDuration) {
      return Promise.reject(new Error('Plans need currency and duration'));
    }
    return string;
  }
  return Promise.reject(new Error('Not a valid string'));
}

export const initialInputReal = `
[{
  "name": "premium",
  "primary": true,
  "general": true,
  "dental": true,
  "specialist": true,
  "physiotherapy": true,
  "chinese medicine": true,
  "price": 388,
  "currency": "HK$",
  "duration": "month"
},
{
  "name": "standard",
  "general": true,
  "dental": true,
  "price": 0,
  "currency": "HK$",
  "duration": "month"
}]
`;

export const initialInput = `
[{
  "name": "standard",
  "general": true,
  "price": 0,
  "currency": "HK$",
  "duration": "month"
},
{
  "name": "premium",
  "primary": true,
  "general": true,
  "specialist": true,
  "physiotherapy": true,
  "price": 388,
  "currency": "HK$",
  "duration": "month"
}]
`;
