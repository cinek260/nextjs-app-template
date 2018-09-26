import { APP_START, SAGA_START } from "types/app";

export const startApp = () => ({
  type: APP_START
});

export const startSaga = () => ({
  type: SAGA_START
});
