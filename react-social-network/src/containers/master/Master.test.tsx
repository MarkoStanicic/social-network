
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'reflect-metadata'
import 'typeface-roboto'
// import 'moment/locale/es'
import 'locales/i18n'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { I18nextProvider } from 'react-i18next'
import i18n from 'locales/i18n'

// - Actions
import * as localeActions from 'store/actions/localeActions'
import * as globalActions from 'store/actions/globalActions'

// - Import app components
import Master from 'containers/master'
// import { App } from 'components/AWS'
// App css
import 'styles/app.css'

/**
 * Execute startup functions
 */
import 'socialEngine'
import rootSaga from 'store/sagas/rootSaga'
import * as authorizeActions from 'store/actions/authorizeActions'
import { socialTheme } from 'config/socialTheme'
import MasterComponent from './MasterComponent';
import { StaticRouter, MemoryRouter } from 'react-router';

configureStore.runSaga(rootSaga)

// Set default data
// tslint:disable-next-line:no-empty
configureStore.store.subscribe(() => { })

// - Initialize languages
configureStore.store.dispatch(authorizeActions.subcribeAuthorizeStateChange())
configureStore.store.dispatch(globalActions.initLocale())
// Needed for onClick
// http://stackoverflow.com/a/34015469/988941
try { injectTapEventPlugin() } catch (e) { }

const theme = createMuiTheme(socialTheme)

const supportsHistory = 'pushState' in window.history
describe('renders without crashing', () => {
  test('Master Componet', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={configureStore.store}>
      <I18nextProvider
            i18n={i18n}
          >
        <MemoryRouter>
          <MuiThemeProvider theme={theme}>
            <MasterComponent />
          </MuiThemeProvider>
        </MemoryRouter>
        </I18nextProvider>
      </Provider>
      , div)
  })
})