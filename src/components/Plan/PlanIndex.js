import React from 'react';
import PlanIndexItem from './PlanIndexItem';

export default function PlanIndex({plans}) {
  return (
    <div>
      {plans}
      <PlanIndexItem />
    </div>
  );
}
