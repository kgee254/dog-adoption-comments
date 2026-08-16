import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { DogProvider } from './context/DogContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider> 
        <DogProvider> 
          <App />
        </DogProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
