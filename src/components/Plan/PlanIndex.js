import React from 'react';

export default function PlanIndex({plans, onClick}) {
  const sortedPlans = JSON.parse(plans).sort((a, b) => a.price - b.price);

  const headers = sortedPlans.map(plan => {
    return (
      <th scope="col" key={plan.name}>
        {plan.name}
      </th>
    );
  });

  const features = Object.keys(JSON.parse(plans).filter(plan => plan.primary)[0]);

  const body = features.map(feature => {
    if (['name', 'primary', 'price', 'currency', 'duration'].includes(feature)) return null;
    return (
      <tr key={feature}>
        <th scope="row">{feature}</th>
        {sortedPlans.map(plan => (
          <td
            title={`${plan.name}-${feature}-${plan[feature] ? 'true' : 'false'}`}
            key={`${plan.name}-${feature}`}
          >
            {plan[feature] ? '✅' : '❌'}
          </td>
        ))}
      </tr>
    );
  });

  const priceCheckbox = (
    <tr>
      <th scope="row"></th>
      {sortedPlans.map(plan => (
        <td key={`${plan.name}-price`} title={`${plan.name}-price`}>
          <label htmlFor={`${plan.name}-price`}>
            <input
              type="radio"
              name="select-plan"
              value={plan.name}
              id={`${plan.name}-price`}
              onClick={e => onClick(e.currentTarget.value)}
            />
            {plan.currency + ' ' + plan.price}{' '}
            <span className="plan-duration">{plan.duration}</span>
          </label>
        </td>
      ))}
    </tr>
  );

  return (
    <>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col"></th>
            {headers}
          </tr>
        </thead>
        <tbody>
          {body}
          {priceCheckbox}
        </tbody>
      </table>
      {/* uncomment to debug */}
      {/* <pre>{prettify(plans)}</pre> */}
    </>
  );
}
