import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import { RecoilRoot } from 'recoil'

import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'

const theme = createTheme()

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <RedwoodApolloProvider>
          <RecoilRoot>
            <ConfirmProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes />
              </ThemeProvider>
            </ConfirmProvider>
          </RecoilRoot>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
