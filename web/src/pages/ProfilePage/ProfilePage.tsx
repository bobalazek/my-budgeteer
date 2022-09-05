import { Box } from '@mui/material'

import { MetaTags } from '@redwoodjs/web'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <Box px={2}>
        <h1>Profile</h1>
        <div>TODO</div>
      </Box>
    </>
  )
}

export default ProfilePage
