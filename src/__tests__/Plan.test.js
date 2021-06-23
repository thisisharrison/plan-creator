import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlanIndex from '../components/Plan/PlanIndex';
import {setUpPlan, samplePlan} from '../test/utils';

describe('<PlanIndex />', () => {
  test('renders plans in table', () => {
    render(<PlanIndex plans={samplePlan} />);
    const headers = screen.queryAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    expect(headers[1]).toHaveTextContent(/standard/i);
    expect(headers[2]).toHaveTextContent(/premium/i);
    expect(screen.getByRole('cell', {name: /standard-general-true/i})).toHaveTextContent('✅');
    expect(screen.getByRole('cell', {name: /standard-physiotherapy-false/i})).toHaveTextContent(
      '❌'
    );
    expect(screen.getByRole('cell', {name: /standard-price/i})).toHaveTextContent(/0/i);
    expect(screen.getByRole('cell', {name: /premium-price/i})).toHaveTextContent(/388/i);
  });

  test('handles plan selection', async () => {
    const [standard, premium, onClick] = setUpPlan();
    expect(standard).not.toBeChecked();
    expect(premium).not.toBeChecked();
    await userEvent.click(standard);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('standard');
    expect(standard).toBeChecked();
    expect(premium).not.toBeChecked();
    jest.clearAllMocks();
    await userEvent.click(premium);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('premium');
    expect(premium).toBeChecked();
    expect(standard).not.toBeChecked();
  });
});
