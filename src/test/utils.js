import React from 'react';
import {render, screen} from '@testing-library/react';
import Editor from '../components/Editor/Editor';
import PlanIndex from '../components/Plan/PlanIndex';

function setUpEditor(options) {
  const onSubmit = jest.fn();
  render(<Editor onSubmit={onSubmit} {...options} />);
  const editor = screen.getByRole('textbox', {name: /input/i});
  const submit = screen.getByRole('button', {name: /submit/i});
  return [editor, submit, onSubmit];
}

function setUpPlan() {
  render(<PlanIndex plans={samplePlan} />);
}

const samplePlan = `
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

const badJSONPlan = `
{
  "bad apple": true,
  "uh oh"
`;

const noPricePlan = `
[{
  "name": "bad apple",
  "primary": true
}]
`;

const noPrimaryPlan = `
[{
  "name": "bad apple",
  "price": 10
}, {
  "name": "bad orange",
  "price": 20
}]
`;

const noArrayPlan = `
{
  "name": "bad apple",
  "primary": true,
  "price": 10
}
`;

export {setUpEditor, setUpPlan, samplePlan, badJSONPlan, noArrayPlan, noPricePlan, noPrimaryPlan};
