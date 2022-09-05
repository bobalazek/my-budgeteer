import { useState } from 'react'

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'

export default function Header() {
  const { isAuthenticated, hasRole } = useAuth()
  const [anchorElement, setAnchorElement] = useState(null)

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
          <Box>
            {hasRole('admin') && (
              <Button
                href="#"
                color="inherit"
                component={Link}
                to={routes.admin()}
              >
                Admin
              </Button>
            )}
            {isAuthenticated && (
              <>
                <Button
                  href="#"
                  color="inherit"
                  component={Link}
                  to={routes.myProjects()}
                >
                  Projects
                </Button>
                <IconButton
                  onClick={(event) => setAnchorElement(event.currentTarget)}
                  sx={{ p: 0, ml: 2 }}
                >
                  <Avatar
                    alt="Profile"
                    src="https://avatars.dicebear.com/api/pixel-art/aaa.svg"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorElement}
                  open={!!anchorElement}
                  onClose={() => setAnchorElement(null)}
                >
                  <MenuItem
                    onClick={() => {
                      navigate(routes.profile())
                      setAnchorElement(null)
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate(routes.settings())
                      setAnchorElement(null)
                    }}
                  >
                    Settings
                  </MenuItem>
                </Menu>
              </>
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
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  )
}
