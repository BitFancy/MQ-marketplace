# NFT Market

Nft market frontend react development code

Backend API
https://github.com/ground-creative/nft-market-backend

Backend API Docker
https://github.com/ground-creative/nft-market-backend-docker

Frontend React
https://github.com/Rutilusmeta/nft-market-frontend

Frontend React Docker
https://github.com/ground-creative/nft-market-frontend-docker

Ganache Test Node Docker
https://github.com/Rutilusmeta/docker-ganache-node

Frontend Apache Docker
https://github.com/ground-creative/nft-market-docker-apache

Frontend Build
https://github.com/ground-creative/nft-market-frontend-build

Nginx Proxy
https://github.com/ground-creative/nft-market-docker-nginx

Project template:\
[https://themeforest.net/item/giglink-react-nextjs-nft-marketplace-template/47154319](https://themeforest.net/item/giglink-react-nextjs-nft-marketplace-template/47154319)

## Available Commands

In the project directory, you can run:

### `npm install`

Installs node modules.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Testing the build

### `npm install serve && serve -s build`

## Override env variables

You can override env variables before calling npm:
```
REACT_APP_ENV=prod npm start
REACT_APP_ENV=prod npm run build
```

# Smart Contract

## Testing

```
npx hardhat test src/contracts/test/NFTMarketplace.js
npx hardhat test src/contracts/test/NFTMarketplace.proxy.js --network {NETWORK DEFINED IN HARDHAT CONFIG}
```

## Deploying

```
npx hardhat run src/contracts/scripts/1.nft-marketplace.deploy.js --network {NETWORK DEFINED IN HARDHAT CONFIG}
```