import { Listing } from '@client/types';

class ListingClient {

  async fetchAll(): Promise<Listing[]> {
    return [{
      id: 1,
      title: 'This is a test listing.'
    }];
  }
}

export default new ListingClient();
