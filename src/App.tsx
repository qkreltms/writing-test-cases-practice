import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store, { CombineReducers, startStep1, step1Completed, StepState } from "./redux";
import axios from "axios"
const myAxios = axios.create()
export { myAxios }

export const getSource = () => myAxios.get<StepState['source']>('https://dog.ceo/api/breeds/image/random')

const Counter = () => {
  const step1 = useSelector((state: CombineReducers) => state.steps.step1);
  const source = useSelector((state: CombineReducers) => state.steps.source);
  const dispatch = useDispatch()

  useEffect(() => {
    if (step1) {
      getSource().then(res => {
        dispatch(step1Completed(res.data))
      })
    }
  }, [step1, dispatch])

  return (
    <>
    <img alt="dogs" src={source.message} width="500px" height="500px"/>
    <button data-testid="app-clickHere" onClick={() => store.dispatch(startStep1())}>click</button>
    </>
  );
};

export default Counter;
