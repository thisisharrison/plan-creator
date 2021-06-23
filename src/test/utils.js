import React from 'react';
import {render, screen, within} from '@testing-library/react';
import Editor from '../components/Editor/Editor';
import PlanIndex from '../components/Plan/PlanIndex';
import App from '../components/App';

function setUpEditor(options) {
  const onSubmit = jest.fn();
  render(<Editor onSubmit={onSubmit} {...options} />);
  const editor = screen.getByRole('textbox', {name: /input/i});
  const submit = screen.getByRole('button', {name: /submit/i});
  return [editor, submit, onSubmit];
}

function setUpPlan() {
  const onClick = jest.fn();
  render(<PlanIndex plans={samplePlan} onClick={onClick} />);
  const standardCell = screen.getByRole('cell', {name: /standard-price/i});
  const standardRadio = within(standardCell).getByRole('radio');
  const premiumCell = screen.getByRole('cell', {name: /premium-price/i});
  const premiumRadio = within(premiumCell).getByRole('radio');
  return [standardRadio, premiumRadio, onClick];
}

function setUpApp() {
  render(<App />);
  const editor = screen.getByRole('textbox', {name: /input/i});
  const submit = screen.getByRole('button', {name: /submit/i});
  return [editor, submit];
}

const samplePlan = `
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

const nonBooleanPlan = `
[{
  "name": "bad apple",
  "primary": true,
  "price": 10,
  "physio": "bad!"
}]
`;

const noCurrencyDurationPlan = `
[{
  "name": "bad apple",
  "primary": true,
  "price": 10,
  "physio": true
}]
`;

export {
  setUpEditor,
  setUpPlan,
  setUpApp,
  samplePlan,
  badJSONPlan,
  noArrayPlan,
  noPricePlan,
  noPrimaryPlan,
  nonBooleanPlan,
  noCurrencyDurationPlan,
};
