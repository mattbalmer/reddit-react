import * as React from 'react';
import { containerize } from '@lib/utils/react';

export const AppContainer = containerize(class extends React.Component<any, any> {
  render() {
    return (
      <div>
        {/*<HeaderContainer />*/}
        <main>
          <div>{this.props.main}</div>
        </main>
      </div>
    );
  }
});