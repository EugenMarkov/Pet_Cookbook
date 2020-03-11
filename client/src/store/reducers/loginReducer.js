import * as constants from "../constants";

const initialState = {
  isPreloader: true,
  isLoading: false,
  isAuthenticated: false,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
  },
  error: "",
  isModalOpen: true,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOG_IN_REQUEST:
      return { ...state, isLoading: true };
    case constants.USER_FROM_JWT:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: "",
          isAdmin: action.payload.isAdmin,
        },
      };
    case constants.LOG_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: "",
      };
    case constants.LOG_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case constants.LOG_OUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: {
          firstName: "",
          lastName: "",
          email: "",
          isAdmin: false,
        },
        error: "",
      };
    case constants.PRELOADER_CLOSE:
      return { ...state, isPreloader: false };
    case constants.USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          isAdmin: action.payload.isAdmin,
        },
        error: "",
      };
    case constants.USER_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case constants.EDIT_USER_DATA_SUCCESS:
      return {
        ...state,
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          isAdmin: action.payload.isAdmin,
        },
        error: "",
      };
    case constants.EDIT_USER_DATA_FAILURE:
      return { ...state, error: action.payload };
    case constants.MODAL_OPEN:
      return { ...state, isModalOpen: true };
    case constants.MODAL_CLOSE:
      return { ...state, isModalOpen: false };
    default:
      return state;
  }
};

export default loginReducer;
