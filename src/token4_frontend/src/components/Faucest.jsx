import React, { useState } from "react";

import { token4_backend } from "../../../declarations/token4_backend";

function Faucet() {
  const [message, setMessage] = useState("Gimme Gimme");
  const [disabled, setDisabled] = useState(false);

  async function handleClick(event) {
    const token = await token4_backend.payOut();
    setDisabled(true);
    setMessage(token);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free DAngela tokens here! Claim 10,000 DANG coins to your
        account.
      </label>
      <p className="trade-buttons">
        <button disabled={disabled} id="btn-payout" onClick={handleClick}>
          {message}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
