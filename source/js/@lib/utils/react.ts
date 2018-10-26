import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ReducerState } from '@client/reducers';

export type mapStateCallback = (state: ReducerState) => any;
export type mapDispatchCallback = (dispatch: Function) => any;

export function containerize(component, mapStateToProps?: mapStateCallback, mapDispatchToProps?: mapDispatchCallback) {
  return withRouter(connect(
    mapStateToProps || (() => ({})),
    mapDispatchToProps || (() => ({})),
  )(component));
}