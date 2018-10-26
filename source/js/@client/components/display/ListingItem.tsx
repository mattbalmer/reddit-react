import * as React from 'react';
import { Listing } from '@client/types';

export interface ListingItemProps {
  listing: Listing;
}

export class ListingItem extends React.Component<ListingItemProps, any> {
  render() {
    const { listing } = this.props;

    return (
      <div className='c-listing-item'>
        <span className='c-listing-item__title'>
          {listing.title}
        </span>
      </div>
    );
  }
}