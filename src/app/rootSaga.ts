import counterSaga from 'features/counter/counterSaga';
import authSaga from 'features/auth/authSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  console.log('Root saga');
  yield all([counterSaga(), authSaga()]);
}
