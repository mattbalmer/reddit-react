import * as React from 'react';
import { Listing } from '@client/types';
import { ListingItem } from '@client/components/display/ListingItem';

export interface ListingListProps {
  listings: Listing[]
}

export class ListingList extends React.Component<ListingListProps, any> {
  render() {
    return (
      <ul>
        {this.props.listings.map((listing, i) =>
          <ListingItem
            key={i}
            listing={listing}
          />
        )}
      </ul>
    );
  }
}