import { ReduxAction } from '@lib/types';

export type AppstateState = {
};

export const defaultState: AppstateState = {
};

export const AppstateReducer = (state: AppstateState = defaultState, action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
};