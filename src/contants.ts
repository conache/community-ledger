const constants = {
  tokenContractAddr: process.env.REACT_APP_TOKEN_PROXY_CONTRACT_ADDRESS || "",
  ledgerContractAddr: process.env.REACT_APP_LEDGER_PROXY_CONTRACT_ADDRESS || "",
  rpcUrl: process.env.REACT_APP_NODE,
};

export default constants;
