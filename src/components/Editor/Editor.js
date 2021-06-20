import React from 'react';
import {isValidJson} from '../../utils';

function Editor({onSubmit}) {
  const [formState, setFormState] = React.useState('');
  const [error, setError] = React.useState({});

  const handleChange = event => {
    setFormState(event.currentTarget.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const string = await isValidJson(formState);
      onSubmit(string);
    } catch (err) {
      setError(err);
    }
  };

  const handleReset = () => {
    setError({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="editor">
          Editor
          <br />
          <textarea id="editor" type="text" onChange={handleChange} value={formState} rows="20" />
        </label>
        {error.message && <small role="alert">{error.message}</small>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {error.message && (
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      )}
    </form>
  );
}

export default Editor;
