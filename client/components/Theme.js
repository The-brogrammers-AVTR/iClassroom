import {createMuiTheme} from '@material-ui/core/styles'

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6576bb'
    },
    secondary: {
      main: '#ADD8E6'
    },
    white: 'white',
    black: 'black',
    red: 'red'
  },
  status: {
    danger: 'orange'
  }
})

export default Theme
