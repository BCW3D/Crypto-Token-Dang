import React, { useState } from "react";
import { Principal } from "@dfinity/principal";

import {
  token4_backend,
  canisterId,
  createActor,
} from "../../../declarations/token4_backend";

import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [principal, setPrincipal] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("Transfer");
  const [disabled, setDisabled] = useState(false);

  async function handleClick() {
    setDisabled(true);
    const principalId = Principal.fromText(principal);
    const transferAmount = Number(amount);

    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    console.log(identity);

    const authorizedPerson = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const transfer = await authorizedPerson.transfer(
      principalId,
      transferAmount
    );

    setMessage(transfer);
    setDisabled(false);
    setAmount("");
    setPrincipal("");
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick}>
            {message}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
