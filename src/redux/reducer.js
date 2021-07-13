import {
  GET_USER_ACCOUNT_REQ,
  GET_USER_ACCOUNT_SUCCESS,
  APP_ERROR,
  LOAD_BLOCKCHAIN_DATA_REQ,
  LOAD_BLOCKCHAIN_DATA_SUCCESS,
  CREATE_TASKS_REQ,
  CREATE_TASKS_SUCCESS,
  TOGGLE_TASKS_REQ,
  TOGGLE_TASKS_SUCCESS,
} from "./constants";

export const accountReducer = (
  state = { account: "", loading: false, error: "" },
  action
) => {
  switch (action.type) {
    case GET_USER_ACCOUNT_REQ:
      return { loding: true };
    case GET_USER_ACCOUNT_SUCCESS:
      return {
        loding: false,
        account: action.payload,
      };
    case APP_ERROR:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export const blockChaiReducer = (
  state = { loading: false, accounts: "", taskCount: "", todoList: {} },
  action
) => {
  switch (action.type) {
    case LOAD_BLOCKCHAIN_DATA_REQ:
      return { loding: true };
    case LOAD_BLOCKCHAIN_DATA_SUCCESS:
      return {
        loding: false,
        accounts: action.payload.accounts[0],
        todoList: action.payload.todoList,
        taskCount: action.payload.taskCount,
        tasks: action.payload.tasks,
      };
    default:
      return state;
  }
};

export const createtaskReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case CREATE_TASKS_REQ:
      return { loding: true };
    case CREATE_TASKS_SUCCESS:
      return {
        loding: false,
      };
    default:
      return state;
  }
};

export const toggleTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_TASKS_REQ:
      return { loding: true };
    case TOGGLE_TASKS_SUCCESS:
      return {
        loding: false,
      };
    default:
      return state;
  }
};
