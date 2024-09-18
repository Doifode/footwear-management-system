import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'
import { PersistStore } from './redux/Store.ts'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistGate persistor={PersistStore}>
      <ToastContainer />
      <App />
    </PersistGate>
  </StrictMode>,
)
