import React from 'react';
import {render, screen} from '@testing-library/react';
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
    expect(screen.getByRole('cell', {name: /standard-pythsiotherapy-false/i})).toHaveTextContent(
      '❌'
    );
    expect(screen.getByRole('cell', {name: /standard-price/i})).toHaveTextContent(/0/i);
    expect(screen.getByRole('cell', {name: /premium-price/i})).toHaveTextContent(/388/i);
  });

  test('update plans on submit', () => {
    setUpPlan();
  });

  test('restore plan on error', () => {
    setUpPlan();
  });

  test('adds new column when new plan is added', () => {
    setUpPlan();
  });

  test('handles onSelect', () => {});
});
