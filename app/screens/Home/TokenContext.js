import React, { useState } from "react";

const TokenContext = React.createContext();

function TokenProvider({ children }) {
  const [token, setTokenContext] = useState(null);

  return (
    <TokenContext.Provider
      value={{
        token,
        setTokenContext,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export { TokenContext, TokenProvider };