import * as React from 'react';
import { containerize } from '@lib/utils/react';
import { ListingActions } from '@client/actions/ListingActions';
import { ListingsContainer } from '@client/components/containers/ListingsContainer';

export const HomePage = containerize(class extends React.Component<any, any> {
  render() {
    return (
      <div>
        <ListingsContainer />
      </div>
    );
  }

  componentDidMount() {
    this.props.componentDidMount();
  }
}, undefined, (dispatch) => {
  return {
    componentDidMount() {
      dispatch(ListingActions.fetchListings());
    }
  }
});