import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authProvider'
import { WindowFocusContextProvider } from './contexts/windowFocus'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WindowFocusContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </WindowFocusContextProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
)
// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App'
// import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './contexts/authProvider'
// import { WindowFocusContextProvider } from './contexts/windowFocus'

// const container = document.getElementById('root') as HTMLElement
// const root = createRoot(container) // createRoot(container!) if you use TypeScript
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <WindowFocusContextProvider>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </WindowFocusContextProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// )
