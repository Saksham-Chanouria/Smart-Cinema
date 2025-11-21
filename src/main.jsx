import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './assets/css/all.min.css'
import './assets/css/animate.css'
import './assets/css/bootstrap.min.css'
import './assets/css/flaticon.css'
import './assets/css/jquery.animatedheadline.css'
import './assets/css/magnific-popup.css'
import './assets/css/main.css'
import './assets/css/nice-select.css'
import './assets/css/odometer.css'
import './assets/css/owl.carousel.min.css'
import './assets/css/owl.theme.default.min.css'
import './assets/css/tooltip.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
