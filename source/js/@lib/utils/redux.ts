export function extendReducer(...reducers) {
  let reducerCount = reducers.length;
  let lastReducer = reducers[reducerCount - 1];
  let defaultState = typeof lastReducer === 'function' ? undefined : lastReducer;
  if(defaultState) {
    reducers = reducers.slice(0, reducerCount - 1);
  }
  return function(state, action) {
    state = state || defaultState;
    let newState = state;
    let i = 0;
    while(newState == state && i < reducerCount) {
      newState = reducers[i](state, action);
      i++;
    }
    return newState;
  };
}