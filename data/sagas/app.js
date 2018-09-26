import { all, put, takeEvery } from "redux-saga/effects";
import { startSaga as startSagaAction } from "actions/app";
import { APP_START } from "types/app";

function* startSaga() {
  yield put(startSagaAction());
}

export default all([takeEvery(APP_START, startSaga)]);
