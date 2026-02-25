/* eslint-disable global-require */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from 'lib/web3Config';
import React, { Suspense } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-circular-progressbar/dist/styles.css';
import ReactDOM from 'react-dom/client';
import 'react-image-lightbox/style.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import 'video.js/dist/video-js.css';
import { WagmiProvider } from 'wagmi';
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
import {
  defaultColor,
  isDarkSwitchActive,
  isMultiColorActive,
} from './constants/defaultValues';
import { getCurrentColor, setCurrentColor } from './helpers/Utils';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

const color =
  isMultiColorActive || isDarkSwitchActive ? getCurrentColor() : defaultColor;
setCurrentColor(color);

import(`./assets/css/sass/themes/gogo.${color}.scss`);

const queryClient = new QueryClient();

const App = React.lazy(() => import(/* webpackChunkName: "App" */ './App'));

const Main = () => {
  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div className="loading" />}>
            <App />
          </Suspense>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
