## 📣 See it live at https://reverent-kare-6dc98a.netlify.app/

# Project idea

We've had an idea internally for a while to build a "Community Ledger" where members of our community could pay a fee to inscribe their names/handles and a message in a "ledger" which will live on forever on chain. It could be a fun idea to let our community members leave some kind of legacy (discussed a bit in [here](https://gov.xtoken.cafe/t/xp2-xtokenomics-proposal/73)).

Your task is to build a basic version of this idea.

Your core smart contract should:

- let users mint an NFT with a `name` and `message` prop, representing their "brick" id in the ledger
- charge users in token XYZ to mint a brick (XYZ is a fake/test ERC20 token you will need to deploy)
- charge users on an increasing scale - the first mint should cost 10 XYZ and subsequent mints should increase in cost by 3%
- be upgradeable (TransparentUpgradeableProxy)
- be verified on [Kovan](https://kovan.etherscan.io/) explorer

Your frontend (React mandatory, Typescript optional) should:

- display minted bricks, with id numbers, names and messages
- allow users to mint a brick (this will require an erc20 approve tx on XYZ and a mint tx)
- display 1) number of total bricks, 2) amount of XYZ in the contract, 3) current price for a brick
- be practical, but well designed with a bit of flourish

# Basic project setup

1. Install dependencies

```
yarn install
```

2. Setup environment variables:

   - Create a `.env` file
   - Populate values specified in the `.env.example` file.

3. Run app

```
yarn start
```

# Deployment

The `master` branch is deployed automatically at https://reverent-kare-6dc98a.netlify.app/.
