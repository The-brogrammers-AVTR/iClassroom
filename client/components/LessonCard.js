import React, {useState} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {removeLesson} from '../store'
import {
  IconButton,
  makeStyles,
  Typography,
  ThemeProvider,
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core'
import theme from './Theme'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    minWidth: theme.spacing(12)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
    // color: theme.palette.primary.main,
  }
})

const LessonCard = ({title, description, id, documents, remove, idx}) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={11}>
            <ExpansionPanel
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  className={classes.heading}
                  color="primary"
                  variant="h6"
                >
                  Lesson {idx + 1}
                </Typography>
                <Typography
                  className={classes.heading}
                  color="primary"
                  variant="h6"
                >
                  {title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{description}</Typography>
              </ExpansionPanelDetails>
              {documents.length > 0 &&
                documents.map((document, idx) => (
                  <ExpansionPanelDetails key={idx}>
                    <a href={document.link} rel="noreferrer" target="_blank">
                      {document.name}
                    </a>
                  </ExpansionPanelDetails>
                ))}
            </ExpansionPanel>
          </Grid>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon onClick={() => remove(id)} />
          </IconButton>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

const mapStateToProps = ({user}) => {
  return {user}
}
const mapDispatchToProps = dispatch => {
  return {
    remove: id => {
      dispatch(removeLesson(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonCard)
