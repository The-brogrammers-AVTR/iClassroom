import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createCourse} from '../store/course'
import {withRouter} from 'react-router-dom'
import {getUserCourses} from '../store'

const CreateCourse = ({user, save, load, history}) => {
  const [name, setName] = useState('')
  const [code, setCode] = useState(Math.ceil(Math.random() * 4000))
  const [subject, setSubject] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [action, setAction] = useState(false)

  const onSubmit = async ev => {
    setAction(!action)
    if (action) {
      console.log('user id', user.id)
      ev.preventDefault()
      try {
        await load()
        await save(
          {
            name: name,
            code: code,
            isOpen: true,
            subject: subject,
            gradeLevel: gradeLevel,
            userId: user.id
          },
          history.push
        )
        setName('')
        setCode(Math.ceil(Math.random() * 4000))
        setAction('')
      } catch (ex) {
        console.log(ex)
      }
    } else {
      setAction(!action)
      ev.preventDefault()
    }
  }

  return (
    <div className="form-wrapper">
      <form className="new-form" onSubmit={onSubmit}>
        <p className="row">
          Name:
          <input
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder="Name"
          />
        </p>
        <p className="row">
          Subject:
          <select onChange={ev => setSubject(ev.target.value)}>
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
          <select onChange={ev => setGradeLevel(ev.target.value)}>
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
