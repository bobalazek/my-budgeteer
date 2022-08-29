import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

export default function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <header>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={routes.home()}
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My Budgeteer
          </Typography>
          {isAuthenticated && (
            <Button
              href="#"
              color="inherit"
              component={Link}
              to={routes.projects()}
            >
              Projects
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              href="#"
              color="inherit"
              component={Link}
              to={routes.login()}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  )
}
