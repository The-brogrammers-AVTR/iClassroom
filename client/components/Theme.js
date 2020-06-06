import {createMuiTheme} from '@material-ui/core/styles'

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ADD8E6'
    },
    secondary: {
      main: '#6576bb'
    }
  },
  status: {
    danger: 'orange'
  }
})

export default Theme
