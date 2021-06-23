import React from 'react';
import {screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  setUpEditor,
  samplePlan,
  badJSONPlan,
  noPricePlan,
  noPrimaryPlan,
  noArrayPlan,
  nonBooleanPlan,
  noCurrencyDurationPlan,
} from '../test/utils';
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
    const newEditor = screen.getByRole('textbox', {name: /input/i});
    const newObj = jsonIfy(newEditor.textContent);
    expect(newObj).toEqual(target);
  });

  test('handles json errors and reset errors', async () => {
    const [editor, submit, onSubmit] = setUpEditor();
    userEvent.type(editor, badJSONPlan);
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

  test('handles missing price error', async () => {
    const [editor, submit, onSubmit] = setUpEditor();
    userEvent.type(editor, noPricePlan);
    await act(async () => {
      await userEvent.click(submit);
    });
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(screen.getByRole('alert')).toHaveTextContent('Missing or incorrect price');
  });

  test('handles missing primary plan error', async () => {
    const [editor, submit, onSubmit] = setUpEditor();
    userEvent.type(editor, noPrimaryPlan);
    await act(async () => {
      await userEvent.click(submit);
    });
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(screen.getByRole('alert')).toHaveTextContent('No primary plan');
  });

  test('handles missing array', async () => {
    const [editor, submit, onSubmit] = setUpEditor();
    userEvent.type(editor, noArrayPlan);
    await act(async () => {
      await userEvent.click(submit);
    });
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(screen.getByRole('alert')).toHaveTextContent('Wrap object in array');
  });

  test('handles non boolean value', async () => {
    const [editor, submit, onSubmit] = setUpEditor();
    userEvent.type(editor, nonBooleanPlan);
    await act(async () => {
      await userEvent.click(submit);
    });
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(screen.getByRole('alert')).toHaveTextContent('Plan feature value must be boolean');
  });

  test('handles missing currency and duration', async () => {
    const [editor, submit, onSubmit] = setUpEditor();
    userEvent.type(editor, noCurrencyDurationPlan);
    await act(async () => {
      await userEvent.click(submit);
    });
    expect(onSubmit).toHaveBeenCalledTimes(0);
    expect(screen.getByRole('alert')).toHaveTextContent('Plans need currency and duration');
  });
});
