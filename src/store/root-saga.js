import { all, call } from 'redux-saga/effects'; //eslint-disable-line

import { categoriesSaga } from './categories/category.saga';

export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}
