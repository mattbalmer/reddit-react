import TicketClient from '@client/clients/ListingClient';
import { Listing } from '@client/types';

export const PREFIX = `@Listing`;
export const ListingActionTypes = {
  ASK_LIST: `${PREFIX}:ASK_LIST`,
  GOT_LIST: `${PREFIX}:GOT_LIST`,
};

export const ListingActions = {
  fetchListings: () => (dispatch) => {
    dispatch({
      type: ListingActionTypes.ASK_LIST,
    });
    TicketClient.fetchAll()
      .then((listings: Listing[]) => {
        dispatch({
          type: ListingActionTypes.GOT_LIST,
          listings,
          receivedAt: Date.now(),
        });
      });
  },
};