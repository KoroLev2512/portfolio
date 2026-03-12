import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initRipple } from './shared/lib/ripple'
import { initImageReveal } from './shared/lib/imageReveal'
import { initLineReveal } from './shared/lib/lineReveal'
import App from './app'

initRipple()
initImageReveal()
initLineReveal()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
