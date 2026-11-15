import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/onest'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import disableDevtool from 'disable-devtool'
import App from './App.tsx'
import { LangProvider } from './i18n/LangProvider'
import { browserLang } from './i18n/lang'
import { ui } from './i18n/ui'

// Простая защита в проде: без правого клика, копирования и DevTools
if (import.meta.env.PROD) {
  disableDevtool({
    disableMenu: true,
    disableSelect: true,
    disableCopy: true,
    disableCut: true,
    rewriteHTML: ui[browserLang()].devtoolsBlocked,
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
