import React from 'react';
import Editor from './Editor/Editor';
import PlanIndex from './Plan/PlanIndex';
import {initialInput} from '../utils';

import './App.scss';

function App() {
  const [plans, setPlans] = React.useState(initialInput);
  const [selection, setSelection] = React.useState(null);

  const onSubmit = json => {
    setPlans(json);
  };

  const onClick = plan => {
    setSelection(plan);
  };

  return (
    <div>
      <header>
        <h1>Plan Creator</h1>
      </header>
      <main>
        <Editor initialInput={plans} onSubmit={onSubmit} />
        <div>
          <label>Choose a plan</label>
          <br />
          {selection ? (
            <p>
              You have selected the <span className="selected-plan">{selection}</span> plan!
            </p>
          ) : null}
          {plans ? <PlanIndex plans={plans} onClick={onClick} /> : null}
        </div>
      </main>
    </div>
  );
}

export default App;
