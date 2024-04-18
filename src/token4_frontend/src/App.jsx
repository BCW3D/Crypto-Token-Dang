import { useState } from "react";
import { token4_backend } from "declarations/token4_backend";

import Header from "./components/Header";
import Faucet from "./components/Faucest";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";

function App() {
  return (
    <main>
      <Header />
      <Faucet />
      <Balance />
      <Transfer />
    </main>
  );
}

export default App;
