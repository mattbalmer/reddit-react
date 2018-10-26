import * as React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory_ } from '@client/browser-history';
import { store } from '@client/reducers/store';
import { HomePage } from '@client/components/pages/HomePage';
import { AppContainer } from '@client/components/containers/AppContainer';

const history = syncHistoryWithStore(browserHistory_, store);

const routes = (
  <div>
    <div>
      <Route component={AppContainer}>
        <div>
          <Route exact path='/' components={{ main: HomePage }}/>
        </div>
      </Route>
    </div>
  </div>
);

const mapStateToProps = (state: any) => {
  return state;
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    componentDidMount() {
    },
  }
};

export const AppComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(class AppComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Router history={history}>
          {routes}
        </Router>
      </div>
    );
  }

  componentDidMount() {
    this.props.componentDidMount();
  }
});
