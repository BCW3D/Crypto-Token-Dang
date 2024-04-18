import React, { useState } from "react";

import { Principal } from "@dfinity/principal";
import {
  token4_backend,
  canisterId,
  createActor,
} from "../../../declarations/token4_backend";

import { AuthClient } from "@dfinity/auth-client";

function Balance() {
  const [principal, setPrincipal] = useState("");
  const [balance, setBalance] = useState("");
  const [hidden, setHidden] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [currecy, setCurrency] = useState("");

  async function handleClick() {
    setDisabled(true);
    const principalId = Principal.fromText(principal);

    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();

    const authorizedPerson = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const balanceResult = await authorizedPerson.balanceOf(principalId);
    console.log(balanceResult);
    const convertBalaceResult = balanceResult.toLocaleString();
    const tokenCurrency = await token4_backend.currency();
    setCurrency(tokenCurrency);
    setBalance(convertBalaceResult);
    setHidden(false);
    setPrincipal("");
    setDisabled(false);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          disabled={disabled}
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={hidden}>
        This account has a balance of {balance + " " + currecy}.
      </p>
    </div>
  );
}

export default Balance;
