import Web3 from "web3";
import {
  PROPOSAL_SMART_CONTRACT_ADD,
  PROPOSAL_SMART_CONTRACT_ABI,
} from "../config";

import {
  GET_USER_ACCOUNT_REQ,
  GET_USER_ACCOUNT_SUCCESS,
  APP_ERROR,
  LIST_TASKS_REQ,
  LIST_TASKS_SUCCESS,
  LOAD_BLOCKCHAIN_DATA_REQ,
  LOAD_BLOCKCHAIN_DATA_SUCCESS,
  CREATE_TASKS_REQ,
  CREATE_TASKS_SUCCESS,
  TOGGLE_TASKS_REQ,
  TOGGLE_TASKS_SUCCESS,
} from "./constants";

export const getUserWalletFromMetaMask = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_ACCOUNT_REQ,
    });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    dispatch({
      type: GET_USER_ACCOUNT_SUCCESS,
      payload: accounts[0],
    });
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: `getUserWallet error: ${JSON.stringify(error.message)}`,
    });
  }
};

export const loadBlockchainData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOAD_BLOCKCHAIN_DATA_REQ,
    });
    const web3 = new Web3(Web3.givenProvider);
    const todoList = new web3.eth.Contract(
      PROPOSAL_SMART_CONTRACT_ABI,
      PROPOSAL_SMART_CONTRACT_ADD
    );

    //get TodoList  tskCount property
   // const taskCount = await todoList.methods.taskCount().call();

    //const tasks = [];
    //for (let i = 0; i <= taskCount; i++) {
     // const eachTask = await todoList.methods.tasks(i).call();
     // tasks.unshift(eachTask);
    }
    dispatch({
      type: LOAD_BLOCKCHAIN_DATA_SUCCESS,
      payload: { accounts, todoList, taskCount, tasks },
    });
  } catch (error) {
    console.log(`Error In Catch ${error}`);
  }
};

export const createTask = (content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_TASKS_REQ,
    });

    const {
      loadBlockchian: { accounts, todoList },
    } = getState();

    todoList.methods
      .createTask(content)
      .send({ from: accounts })
      .once("receipt", (receipt) => {
        dispatch({
          type: CREATE_TASKS_SUCCESS,
          payload: null,
        });
      });
  } catch (error) {
    console.log(`Error In Catch ${error}`);
  }
};

export const toggleCompleted = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOGGLE_TASKS_REQ,
    });

    const {
      loadBlockchian: { accounts, todoList },
    } = getState();

    todoList.methods
      .toggleCompleted(taskId)
      .send({ from: accounts })
      .once("receipt", (receipt) => {
        dispatch({
          type: TOGGLE_TASKS_SUCCESS,
          payload: null,
        });
      });
  } catch (error) {
    console.log(`Error In Catch ${error}`);
  }
};
