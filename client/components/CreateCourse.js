import React from 'react'
import {connect} from 'react-redux'
import {createCourse} from '../store/course'
import {withRouter} from 'react-router-dom'
import {getUserCourses} from '../store'

class CreateCourse extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      code: '',
      isOpen: true,
      subject: '',
      gradeLevel: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(event) {
    const {user} = this.props
    console.log('user id', user.id)
    event.preventDefault()
    try {
      await this.props.save(
        {
          name: this.state.name,
          code: this.state.code,
          isOpen: this.state.isOpen,
          subject: this.state.subject,
          gradeLevel: this.state.gradeLevel,
          userId: user.id
        },
        this.props.history.push
      )
    } catch (ex) {
      console.log(ex)
    }
  }

  componentDidMount() {
    this.props.load()
  }

  render() {
    const {name, code, subject, gradeLevel, error} = this.state

    return (
      <div className="form-wrapper">
        <form className="new-form" onSubmit={this.onSubmit}>
          {error}
          <p className="row">
            Name:
            <input
              value={name}
              onChange={ev => this.setState({name: ev.target.value})}
              placeholder="Name"
            />
          </p>
          <p className="row">
            Code:
            <input
              value={code}
              onChange={() =>
                this.setState({code: Math.ceil(Math.random() * 4000)})
              }
              placeholder="code"
            />
          </p>
          <p className="row">
            Subject:
            <select
              onChange={event => this.setState({subject: event.target.value})}
            >
              <option value="">--Select a Subject--</option>
              <option value="English">English</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Art">Art</option>
              <option value="Music">Music</option>
            </select>
          </p>
          <p className="row">
            Grade Level:
            <select
              onChange={event =>
                this.setState({gradeLevel: event.target.value})
              }
            >
              <option value="">--Select a Grade--</option>
              <option value="Elementary">Elementary</option>
              <option value="Advanced">Advanced</option>
              <option value="Honors">Honors</option>
            </select>
          </p>

          <button
            type="submit"
            disabled={!name || !code || !subject || !gradeLevel}
          >
            Create Course
          </button>
        </form>
      </div>
    )
  }
}

const mapStatetoProps = ({user}) => {
  return {
    user
  }
}

const mapDispatchToProducts = dispatch => {
  return {
    load: () => dispatch(getUserCourses()),
    save: (course, push) => dispatch(createCourse(course, push))
  }
}

export default withRouter(
  connect(mapStatetoProps, mapDispatchToProducts)(CreateCourse)
)
