import React from 'react';
import {screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {setUpApp, samplePlan} from '../test/utils';

describe('<App />', () => {
  test('update plans on submit', async () => {
    const [editor, submit] = setUpApp();
    userEvent.type(editor, samplePlan);
    await act(async () => await userEvent.click(submit));
    const old = screen.getByRole('cell', {name: /standard-physiotherapy-false/i});
    expect(old).toBeInTheDocument();
    const obj = JSON.parse(samplePlan);
    obj[0]['physiotherapy'] = true;
    userEvent.clear(editor);
    userEvent.type(editor, JSON.stringify(obj));
    await act(async () => await userEvent.click(submit));
    const newCell = screen.getByRole('cell', {name: /standard-physiotherapy-true/i});
    expect(newCell).toBeInTheDocument();
  });

  test('adds new column when new plan is added', async () => {
    const [editor, submit] = setUpApp();
    userEvent.type(editor, samplePlan);
    await act(async () => await userEvent.click(submit));
    let headers = screen.queryAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    const obj = JSON.parse(samplePlan);
    obj.push({
      name: 'family',
      general: true,
      specialist: true,
      price: 288,
      currency: 'HK$',
      duration: 'month',
    });
    userEvent.clear(editor);
    userEvent.type(editor, JSON.stringify(obj));
    await act(async () => await userEvent.click(submit));
    headers = screen.queryAllByRole('columnheader');
    expect(headers).toHaveLength(4);
    expect(headers[1]).toHaveTextContent(/family/i);
    const feature = screen.getByRole('cell', {name: /family-specialist-true/i});
    expect(feature).toBeInTheDocument();
    const price = screen.getByRole('cell', {name: /family-price/i});
    expect(price).toHaveTextContent(288);
  });

  test('announces selected plan', () => {
    setUpApp();
    const premium = screen.getByRole('radio', {name: /hk\$ 388 month/i});
    userEvent.click(premium);
    expect(screen.getByText(/you have selected the/i)).toHaveTextContent(/premium/i);
    const standard = screen.getByRole('radio', {name: /hk\$ 0 month/i});
    userEvent.click(standard);
    expect(screen.getByText(/you have selected the/i)).toHaveTextContent(/standard/i);
  });

  // test('restore plan on error', () => {
  //   setUpPlan();
  // });

  // test('saves input', () => {
  //   setUpPlan();
  // });
});
