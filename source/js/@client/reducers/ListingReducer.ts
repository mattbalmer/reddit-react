import { ReduxAction } from '@lib/types';
import { Listing } from '@client/types';
import { ListingActionTypes } from '@client/actions/ListingActions';

export type ListingState = {
  listings: {
    [key: string]: Listing;
  },
};

export const defaultState: ListingState = {
  listings: {},
};

export const ListingReducer = (state: ListingState = defaultState, action: ReduxAction): ListingState => {
  switch (action.type) {
    case ListingActionTypes.GOT_LIST:
      return {
        ...state,
        listings: action.listings,
      };
    default:
      return state;
  }
};