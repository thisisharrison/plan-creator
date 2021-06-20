import React from 'react';
import {render, screen} from '@testing-library/react';
import {setUpPlan} from '../test/utils';

describe('<PlanIndex /> and <PlanIndexItem />', () => {
  test('renders initial plans', () => {
    setUpPlan();
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
