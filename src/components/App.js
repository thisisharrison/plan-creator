import React from 'react';
import Editor from './Editor/Editor';
import PlanIndex from './Plan/PlanIndex';

import './App.scss';

function App() {
  const [plans, setPlans] = React.useState('');

  const onSubmit = json => {
    setPlans(json);
  };

  return (
    <div>
      <header>
        <h1>Plan Creator</h1>
      </header>
      <main>
        <Editor onSubmit={onSubmit} />
        <PlanIndex plans={plans} />
      </main>
    </div>
  );
}

export default App;
