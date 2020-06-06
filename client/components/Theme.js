import {createMuiTheme} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import indigo from '@material-ui/core/colors/indigo'

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
