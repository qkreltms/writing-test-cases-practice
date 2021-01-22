import React from "react"
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import App from './App';
import nock from "nock"
import { Provider } from 'react-redux';
import store, { init, startStep1, StepState } from './redux';

describe('learn writing tests', () => {
  const mockComponenet = () => {
    render(    
    <Provider store={store}>
      <App />
    </Provider>);
  }

  afterEach(() => {
    // store cleanup
    store.dispatch(init())
    // nock cleanup 
    nock.cleanAll()
    // render cleanup
    cleanup()
  })

  test('should work', async () => {
    mockComponenet()
    // https://dog.ceo/api/breeds/image/random
    nock('https://dog.ceo/api')
    .get('/breeds/image/random')
    .reply(200, { message: 'test', status: 'success'} as StepState['source'])

    // before dispatching an action check initial value is set.
    expect(store.getState().steps.step1).toBe(false)

    store.dispatch(startStep1())

    // NOTE: 'expect' returns promise, so we can wait state changes
    await waitFor(() =>  expect(store.getState().steps.step1).toBe(true))
    await waitFor(() => expect(store.getState().steps.source.status).toBe('success'))
    await waitFor(() => expect(store.getState().steps.source.message).toBe('test') )
  })

  test('should button click works', async () => {
    mockComponenet()

    nock('https://dog.ceo/api')
    .get('/breeds/image/random')
    .reply(200, { message: 'test2', status: 'success'} as StepState['source'])

    // before clicking a button, check initial value is set.
    await expect(store.getState().steps.step1).toBe(false)

    const myButton = await screen.findByText('click')
    fireEvent.click(myButton) 

    await waitFor(() => expect(store.getState().steps.step1).toBe(true))
    await waitFor(() => expect(store.getState().steps.source.status).toBe('success'))
    await waitFor(() => expect(store.getState().steps.source.message).toBe('test2') )
  })
});
