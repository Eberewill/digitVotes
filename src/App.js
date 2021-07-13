import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { ListGroup, Navbar, Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import MetaAlert from "./Componenets/MetaAlert";
import NavBar from "./Componenets/NavBar";
import {
  loadBlockchainData,
  createTask,
  getUserWalletFromMetaMask,
} from "./redux/action";
function App() {
  const dispatch = useDispatch();

  //const loadBlockchian = useSelector((state) => state.loadBlockchian);
  // const { loading, accounts, todoList, taskCount, tasks } = loadBlockchian;

  const accountData = useSelector((state) => state.accountData);
  const { loading, account, error } = accountData;

  const [hasMetaMask, sethasMetaMask] = useState(true);

  useEffect(() => {
    // ;

    if (typeof window.ethereum !== "undefined") {
      dispatch(getUserWalletFromMetaMask());
    } else {
      sethasMetaMask(false);
    }
  }, [dispatch]);

  if (!hasMetaMask) {
    return <MetaAlert />;
  }
  return (
    <>
      <NavBar account={account} />
      <Container>{account}</Container>
    </>
  );
}

export default App;
