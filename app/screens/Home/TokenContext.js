import React, { useState } from "react";

const TokenContext = React.createContext();

function TokenProvider({ children }) {
  const [token, setTokenContext] = useState(null);
  console.log(token);

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