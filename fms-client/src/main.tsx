import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';
import { PersistStore, store } from './redux/Store';
import { FMSThemeProvider } from './utils/theme/FMSThemeProvider';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store} >
        <FMSThemeProvider>
          <PersistGate persistor={PersistStore}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <App />
          </PersistGate>
        </FMSThemeProvider>
      </Provider>


    </StrictMode>,
  );
}
