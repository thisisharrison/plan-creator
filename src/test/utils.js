import React from 'react';
import {render, screen} from '@testing-library/react';
import Editor from '../components/Editor/Editor';
import PlanIndex from '../components/Plan/PlanIndex';

function setUpEditor(options) {
  const onSubmit = jest.fn();
  render(<Editor onSubmit={onSubmit} {...options} />);
  const editor = screen.getByRole('textbox', {name: /editor/i});
  const submit = screen.getByRole('button', {name: /submit/i});
  return [editor, submit, onSubmit];
}

function setUpPlan() {
  render(<PlanIndex />);
}

const samplePlan = `
[{
  "name": "standard",
  "general": true,
  "specialist": false,
  "pythsiotherapy": false,
  "price": 0
},
{
  "name": "premium",
  "general": true,
  "specialist": true,
  "pythsiotherapy": true,
  "price": 388
}]
`;

const badPlan = `
{
  "bad apple": true,
  "uh oh"

`;

export {setUpEditor, setUpPlan, samplePlan, badPlan};
