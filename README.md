# Plan Creator

## Development

In the root project directory, run:

1. `yarn install`
2. `yarn start`
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployed Site

[Demo](https://thisisharrison.github.io/plan-creator/)

## Instructions

Input JSON input format and data structure as follow:

- Objects wrapped in an array
- One of the objects must include `primary` to indicate the plan with the most features and the
  order in which to display the features
- All plans must have `name` and `price`, otherwise `Editor` will throw an error
- All plans must have `currency` and `duration`, otherwise `Editor` will throw an error
- All plans feature must be a `boolean`, otherwise `Editor` will throw an error

Assumptions:

- No nested features (eg. Dental: Cleaning, Filling, X-Ray), although this data structure could
  support it.
- Primary plans have all the features that inferior plans have. An inferior plan should not have a
  feature that primary plan does not have.

```json
[
  {
    "name": "premium",
    "primary": true,
    "general": true,
    "specialist": true,
    "dental": true,
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
  }
]
```
