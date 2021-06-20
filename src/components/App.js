import React from 'react';
import Editor from './Editor/Editor';
import PlanIndex from './Plan/PlanIndex';
import {initialInput} from '../utils';

import './App.scss';

function App() {
  const [plans, setPlans] = React.useState(initialInput);

  const onSubmit = json => {
    setPlans(json);
  };

  return (
    <div>
      <header>
        <h1>Plan Creator</h1>
      </header>
      <main>
        <Editor intialInput={initialInput} onSubmit={onSubmit} />
        <div>
          <label>Choose a plan</label>
          <br />
          {plans ? <PlanIndex plans={plans} /> : null}
        </div>
      </main>
    </div>
  );
}

export default App;
