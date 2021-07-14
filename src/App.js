import React, { useEffect, useState } from "react";
import Loader from "./Componenets/Loader";
import { Container, Form, Button, Table, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import MetaAlert from "./Componenets/MetaAlert";
import NavBar from "./Componenets/NavBar";
import Message from "./Componenets/Message";
import {
  loadBlockchainData,
  getUserWalletFromMetaMask,
  getVotes,
  castVote,
  // cleanContract,
} from "./redux/action";
function App() {
  const dispatch = useDispatch();

  const accountData = useSelector((state) => state.accountData);
  const { loading, account, error } = accountData;

  const votes = useSelector((state) => state.votes);
  const {
    loading: loadingVotes,
    votes: mVotes,
    yesVotes,
    VOTE_FEE,
    noVotes,
    proposalId,
    error: votesError,
  } = votes;

  const vote = useSelector((state) => state.vote);
  const { loading: voteLoading, reciept, error: voteError } = vote;

  const [hasMetaMask, sethasMetaMask] = useState(true);
  const [voteData, setVoteData] = useState("");

  function hanleStateSelect(e) {
    e.preventDefault();
    setVoteData(e.target.value);
  }

  useEffect(() => {
    const willMountTest = async () => {
      if (typeof window.ethereum !== "undefined") {
        await dispatch(getUserWalletFromMetaMask());
        await dispatch(loadBlockchainData());
        await dispatch(getVotes());
      } else {
        sethasMetaMask(false);
      }
    };
    willMountTest();
  }, [dispatch, reciept]);

  if (!hasMetaMask) {
    return <MetaAlert />;
  }
  return (
    <>
      <NavBar account={account} />

      <main className="py-3">
        {error && <Message variant="danger">{error}</Message>}
        {votesError && <Message variant="danger">{votesError}</Message>}
        {voteError && <Message variant="danger">{voteError}</Message>}
        <Container>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Vote for current Proposal</Form.Label>
              <Form.Control
                as="select"
                value={voteData}
                onChange={(e) => hanleStateSelect(e)}
              >
                <option value="2">Yes</option>
                <option value="1">No</option>
              </Form.Control>{" "}
            </Form.Group>
            <Button
              disabled={voteLoading}
              onClick={(e) => {
                e.preventDefault();
                if (!voteData) {
                  alert("please you must select from the options");
                } else if (mVotes > 0) {
                  alert("You have already Voted");
                } else {
                  dispatch(castVote(Number(voteData)));
                }
              }}
              variant="dark"
            >
              {voteLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  wait while we Proceess..
                </>
              ) : (
                "Click to Vote"
              )}
            </Button>{" "}
          </Form>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th style={{ color: "green" }}>Number of Positive Votes</th>
                <th style={{ color: "red" }}>Number of Negative Votes</th>
                <th>My Vote</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{proposalId && proposalId}</td>
                <td style={{ color: "green" }}>{yesVotes && yesVotes}</td>
                <td style={{ color: "red" }}>{noVotes && noVotes}</td>
                <td>
                  {mVotes && mVotes == 1 ? (
                    <>
                      {" "}
                      <p style={{ color: "red" }}>Negative</p>{" "}
                    </>
                  ) : mVotes == 2 ? (
                    <>
                      {" "}
                      <p style={{ color: "green" }}>Positive</p>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <span>Negative</span>{" "}
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          <Button
            style={{ color: "red" }}
            //onClick={() => {
            //  dispatch(cleanContract());
            // }}
          >
            {" "}
            Voting fee is {VOTE_FEE / 1000000000000000000} Eth
          </Button>
        </Container>
      </main>
    </>
  );
}

export default App;
