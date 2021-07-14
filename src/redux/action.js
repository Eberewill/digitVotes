import Web3 from "web3";
import {
  PROPOSAL_SMART_CONTRACT_ADD,
  PROPOSAL_SMART_CONTRACT_ABI,
} from "../config";

import {
  GET_USER_ACCOUNT_REQ,
  GET_USER_ACCOUNT_SUCCESS,
  LOAD_BLOCKCHAIN_DATA_REQ,
  LOAD_BLOCKCHAIN_DATA_SUCCESS,
  APP_ERROR,
  GET_VOTES_REQ,
  GET_VOTES_RES,
  CAST_VOTE_REQ,
  CAST_VOTE_RES,
} from "./constants";
const web3 = new Web3(Web3.givenProvider);

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

export const loadBlockchainData = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_BLOCKCHAIN_DATA_REQ,
    });

    const proposal = new web3.eth.Contract(
      PROPOSAL_SMART_CONTRACT_ABI,
      PROPOSAL_SMART_CONTRACT_ADD
    );

    dispatch({
      type: LOAD_BLOCKCHAIN_DATA_SUCCESS,
      payload: proposal,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: `getUserWallet error: ${JSON.stringify(error.message)}`,
    });
  }
};

export const getVotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_VOTES_REQ,
    });
    //get smartcontract

    const {
      smartContract: { proposal },
    } = getState();
    //get account
    const {
      accountData: { account },
    } = getState();

    //get votes

    const votes = await proposal.methods.getVote(account).call();
    const yesVotes = await proposal.methods.votesForYes().call();
    const noVotes = await proposal.methods.votesForNo().call();
    const VOTE_FEE = await proposal.methods.VOTE_FEE().call();

    const proposalId = await proposal.methods.proposalId().call();
    dispatch({
      type: GET_VOTES_RES,
      payload: { votes, yesVotes, noVotes, proposalId, VOTE_FEE },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: `getUserWallet error: ${JSON.stringify(error.message)}`,
    });
  }
};

export const castVote = (content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAST_VOTE_REQ,
    });

    //get smartcontract
    const {
      smartContract: { proposal },
    } = getState();

    //get account
    const {
      accountData: { account },
    } = getState();

    //get transaction fee
    const VOTE_FEE = await proposal.methods.VOTE_FEE().call();

    //call vote function
    proposal.methods
      .vote(content)
      .send({ from: account, value: VOTE_FEE })
      .once("receipt", (receipt) => {
        dispatch({
          type: CAST_VOTE_RES,
          payload: 1,
        });
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: `getUserWallet error: ${JSON.stringify(error.message)}`,
    });
  }
};

export const cleanContract = () => async (dispatch, getState) => {
  try {
    const {
      smartContract: { proposal },
    } = getState();

    const cleanResult = await proposal.methods.clean().call();

    console.log("contarct clean was called");

    console.log(cleanResult);
  } catch (error) {
    console.log(error);
    dispatch({
      type: APP_ERROR,
      payload: `getUserWallet error: ${JSON.stringify(error.message)}`,
    });
  }
};
