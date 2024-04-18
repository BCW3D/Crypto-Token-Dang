import React from "react";

import { AuthClient } from "@dfinity/auth-client";

function Header() {
  const handleClick = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout({ returnTo: "https://identity.ic0.app/#authrize" });
  };
  return (
    <header>
      <div className="blue window" id="logo">
        <h1>
          <span role="img" aria-label="tap emoji">
            💎
          </span>
          DSurv
        </h1>
        <button onClick={handleClick}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
