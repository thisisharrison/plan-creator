import React from 'react';
import {isValidJson} from '../../utils';

function Editor({initialInput = '', onSubmit}) {
  const [formState, setFormState] = React.useState(initialInput);
  const [error, setError] = React.useState({});

  const handleChange = event => {
    setFormState(event.currentTarget.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const string = await isValidJson(formState);
      onSubmit(string);
      if (error.message) setError({});
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
          Input
          <br />
          <textarea
            id="editor"
            type="text"
            role="textbox"
            onChange={handleChange}
            value={formState}
            rows="20"
          />
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
