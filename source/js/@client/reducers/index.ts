import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { AppstateState, AppstateReducer } from '@client/reducers/AppstateReducer';
import { ReduxReducer, ReduxState } from '@client/reducers/ReduxReducer';
import { ListingReducer, ListingState } from '@client/reducers/ListingReducer';

export interface ReducerState {
  routing: routerReducer;
  appstate: AppstateState;
  redux: ReduxState;
  listings: ListingState;
}

const reducers = combineReducers({
  routing: routerReducer,
  appstate: AppstateReducer,
  redux: ReduxReducer,
  listings: ListingReducer,
});

export default reducers;