import {
  GET_USER_ACCOUNT_REQ,
  GET_USER_ACCOUNT_SUCCESS,
  APP_ERROR,
  LOAD_BLOCKCHAIN_DATA_REQ,
  LOAD_BLOCKCHAIN_DATA_SUCCESS,
  GET_VOTES_REQ,
  GET_VOTES_RES,
  CAST_VOTE_REQ,
  CAST_VOTE_RES,
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
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const smartContractReducr = (
  state = { loading: false, proposal: {} },
  action
) => {
  switch (action.type) {
    case LOAD_BLOCKCHAIN_DATA_REQ:
      return { ...state, loding: true };
    case LOAD_BLOCKCHAIN_DATA_SUCCESS:
      return {
        loading: false,
        proposal: action.payload,
      };
    case APP_ERROR:
      return {
        error: action.payload,
        loading: false,
        ...state,
      };
    default:
      return state;
  }
};

export const votesReducer = (
  state = {
    loading: false,
    votes: "",
    yesVote: "",
    proposalId: "",
    VOTE_FEE: "",
  },
  action
) => {
  switch (action.type) {
    case GET_VOTES_REQ:
      return { ...state, loding: true };
    case GET_VOTES_RES:
      return {
        loading: false,
        votes: action.payload.votes,
        yesVotes: action.payload.yesVotes,
        noVotes: action.payload.noVotes,
        proposalId: action.payload.proposalId,
        VOTE_FEE: action.payload.VOTE_FEE,
      };
    case APP_ERROR:
      return {
        error: action.payload,
        loading: false,
        ...state,
      };
    default:
      return state;
  }
};

export const castVoteReducer = (
  state = { loading: false, reciept: "" },
  action
) => {
  switch (action.type) {
    case CAST_VOTE_REQ:
      return { ...state, loading: true };
    case CAST_VOTE_RES:
      return {
        loading: false,
        reciept: action.payload,
      };
    case APP_ERROR:
      return {
        error: action.payload,
        loading: false,
        ...state,
      };
    default:
      return state;
  }
};
