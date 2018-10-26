import * as React from 'react';
import { containerize } from '@lib/utils/react';
import { mongoObjToArray } from '@lib/utils/fn';
import { ListingList } from '@client/components/display/ListingList';

export const ListingsContainer = containerize(class extends React.Component<any, any> {
  render() {
    return (
      <div>
        <ListingList
          listings={mongoObjToArray(this.props.listings)}
        />
      </div>
    );
  }
}, (state) => ({
  listings: state.listings.listings,
}));