import React from 'react';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {setUpEditor, samplePlan, badPlan} from '../test/utils';
import {jsonIfy} from '../utils';

describe('<Editor />', () => {
  test('renders textbox', () => {
    const [editor, submit] = setUpEditor();
    expect(editor).toBeInTheDocument();
  });

  test('handles change and submit', async () => {
    const [editor, submit, onSubmit] = setUpEditor();
    userEvent.type(editor, samplePlan);
    const obj = jsonIfy(editor.textContent);
    const target = jsonIfy(samplePlan);
    expect(obj).toEqual(target);
    await userEvent.click(submit);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(samplePlan);
    const newEditor = screen.getByRole('textbox', {name: /editor/i});
    const newObj = jsonIfy(newEditor.textContent);
    expect(newObj).toEqual(target);
  });

  test('handles errors and reset errors', async () => {
    const [editor, submit, onSubmit] = setUpEditor();
    userEvent.type(editor, badPlan);
    await act(async () => {
      await userEvent.click(submit);
    });
    expect(onSubmit).toHaveBeenCalledTimes(0);
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toMatchInlineSnapshot(`"Unexpected end of JSON input"`);
    const reset = screen.getByRole('button', {name: /reset/i});
    expect(reset).toBeInTheDocument();
    userEvent.click(reset);
    expect(alert).not.toBeInTheDocument();
  });
});
