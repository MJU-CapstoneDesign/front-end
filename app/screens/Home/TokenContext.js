import React, { useState } from "react";

const TokenContext = React.createContext();

function TokenProvider({ children }) {
  const [token, setTokenContext] = useState(null);
  const [joinCheck, setJoinCheck] = useState(false);
  const [partyIdContext, setPartyIdContext] = useState(null);

  return (
    <TokenContext.Provider
      value={{
        token,
        setTokenContext,
        joinCheck,
        setJoinCheck,
        partyIdContext,
        setPartyIdContext,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export { TokenContext, TokenProvider };
