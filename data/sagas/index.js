import { all } from "redux-saga/effects";
import app from "./app";

export default function* rootSaga() {
  try {
    yield all([app]);
  } catch (e) {
    // eslint-disable-next-line  no-console
    console.warn(e.message);
  }
}
