import { all, SagaIterator } from 'redux-saga/effects';
import { userLogin, userRegister, userLogout } from './auth';

export default function* rootSaga(): SagaIterator {
  yield all([userLogin(), userRegister(), userLogout()]);
}
