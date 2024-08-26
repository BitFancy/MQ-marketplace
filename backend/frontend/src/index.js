import React from "react";
import { WalletEntryPosition } from '@particle-network/auth';
import ReactDOM from "react-dom/client";
import { ModalProvider } from '@particle-network/connectkit';
import { PolygonAmoy, BNBChain, BNBChainTestnet, Ethereum } from '@particle-network/chains';
import { evmWallets, metaMask, rainbow, walletconnect } from '@particle-network/connectors';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/assets/css/tailwind.css";
import '@particle-network/connectkit/dist/index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ModalProvider
      options={{
        projectId: process.env.REACT_APP_PARTICLE_PROJECT_ID,
        clientKey: process.env.REACT_APP_PARTICLE_CLIENT_KEY,
        appId: process.env.REACT_APP_PARTICLE_APP_ID,
        chains: [
          ((process.env.REACT_APP_CHAIN_ENV === 'testing') ? PolygonAmoy : ''),
          BNBChain, BNBChainTestnet, Ethereum
        ],
        particleWalletEntry: {
          displayWalletEntry: true,
          defaultWalletEntryPosition: WalletEntryPosition.BR,
        },
        wallet: {
          visible: ((process.env.REACT_APP_CHAIN_ENV === 'dev') ? true : true),
          supportChains: [
            ((process.env.REACT_APP_CHAIN_ENV === 'testing') ? PolygonAmoy : '')
          ],
          themeType: "dark"
        }, 
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: 1,
          promptMasterPasswordSettingWhenLogin: 1
        },
        connectors: [
          //...evmWallets({ 
          //   projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
          //   showQrModal: true
          //</React.StrictMode> }),
          metaMask({ }),
          // , rainbow({ projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID }),
          //walletconnect({ projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID })
          //walletconnect({})
        ]
      }}
      theme={'dark'}
      language={'en'}
      preferredAuthType={[
        'email'
      ]}
      walletSort={['Particle Auth', 'Wallet']}
    >
      <App />
    </ModalProvider>
  </React.StrictMode>
);
reportWebVitals();