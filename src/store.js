import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  smartContractReducr,
  accountReducer,
  votesReducer,
  castVoteReducer,
} from "./redux/reducer";

const reducer = combineReducers({
  smartContract: smartContractReducr,
  accountData: accountReducer,
  votes: votesReducer,
  vote: castVoteReducer,
});

const initialState = {
  accountData: accountReducer,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
