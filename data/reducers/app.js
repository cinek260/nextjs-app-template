import { APP_START, SAGA_START } from "types/app";

const reducer = (
  state = {
    appStarted: false,
    sagaStarted: false
  },
  { type }
) => {
  switch (type) {
    case APP_START: {
      return {
        ...state,
        appStarted: true
      };
    }
    case SAGA_START: {
      return {
        ...state,
        sagaStarted: true
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
