import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/onest'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import disableDevtool from 'disable-devtool'
import App from './App.tsx'

// Простая защита в проде: без правого клика, копирования и DevTools
if (import.meta.env.PROD) {
  disableDevtool({
    disableMenu: true,
    disableSelect: true,
    disableCopy: true,
    disableCut: true,
    rewriteHTML: 'Закройте инструменты разработчика и обновите страницу.',
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
