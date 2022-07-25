import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store, persistor } from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import { Router } from './router'
import theme from './theme.json'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toast } from './components/Shared'


/**
 * Theme images
 */
import logo from './assets/images/logo.png'
 
 /**
  * Theme icons
  */
 
theme.images = {
  logo
 }
 
theme.icons = {

}

const RouteApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <ThemeProvider theme={theme}>
            <Router />
            <Toast />
          </ThemeProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouteApp />
)
