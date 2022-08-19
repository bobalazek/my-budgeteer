import { Box } from '@mui/material'

import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="Home"
        description="The project budgetting app you were always looking for."
      />

      <Box px={2} textAlign="center">
        <p>
          This is basically the page you have been waiting for quite a while.
        </p>
        <p>In the meantime, please signup or view your projects</p>
      </Box>
    </>
  )
}

export default HomePage
