import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    createStore
  } from "redux";
  import thunk from "redux-thunk";
  
  export interface CombineReducers {
    steps: StepState;
  }
  
  export interface StepState {
    step1: boolean;
    source: { message: string, status: string};
  }
  
  export const initialState: StepState = {
    step1: false,
    source: {message: '', status: ''},
  };

  export const init = () => (
  {
    type: 'INIT',
  })

  export const step1Completed = (source: StepState['source']) => {
      return {
          type: "STEP1_COMPLETED",
          payload: source,
      }
  }  
  
  export const startStep1 = () => {
    return {
        type: "START_STEP1",
    }
  }

  export interface MyAction {
    type: string, payload: any 
  }
  
  export function steps(state = initialState, action: AnyAction & MyAction) {
    switch (action.type) {
      case "START_STEP1":
        return { ...state, step1: true } as StepState; 
     case "STEP1_COMPLETED": 
        return { ...state, source: { ...action.payload } } as StepState;
      case "INIT":
        return { ...initialState }
      default:
        return state;
    }
  }
  
  export const reduce = combineReducers<CombineReducers>({
    steps
  });
  
  export const store = createStore(
    reduce,
    {},
    applyMiddleware(thunk)
  );

  export default store
  