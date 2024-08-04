import { Box, Stack } from '@mui/material'
import AppName from './AppName'
import Pantry from '../Pantry'
export default function MainContent() {
  return (
    <Box  width={'100%'} height={'100%'}>
      <AppName />
      <Box width={'100%'} height={'90%'} >
        <Pantry />
      </Box>
    </Box>
  )
}
