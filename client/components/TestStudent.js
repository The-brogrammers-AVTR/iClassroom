import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
const XLSX = require('xlsx')
import {connect} from 'react-redux'
import {v4} from 'uuid'
import {updateUserassignment} from '../store/userassignment'
const moment = require('moment')
import Timer from 'timer-component'

class TestStudent extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      answers: new Set(),
      grade: 0,
      submit: 0,
      allRows: [],
      count: 0
    }
    this.submit = this.submit.bind(this)
    this.generateTest = this.generateTest.bind(this)
    this.checkStudent = this.checkStudent.bind(this)
  }

  generateTest() {
    let testNumber = this.props.match.params.testId
    const {test} = this.props
    if (test) {
      console.log(test)
      let found = test.find(elem => {
        return elem.id === testNumber * 1
      })
      console.log(found, this.props.match.params.testId)

      let rowObj
      let allRows = []
      let testObj = {}

      let data = Object.fromEntries(found.test)
      data = Object.values(data).map(Number)
      //let a = data.split(',').map(Number)
      let wb = XLSX.read(data, {type: 'array'})
      wb.SheetNames.forEach(sheet => {
        rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet])
        allRows.push(rowObj)
      })
      this.setState({allRows: allRows})
      console.log('all rows', allRows)
    }
  }
  findUserAssignment() {
    const {userassignment, user} = this.props
    const {id, testId} = this.props.match.params
    console.log(id, testId)
    let oneUserAssignment = userassignment.find(ua => {
      if (
        ua.courseId == id &&
        ua.assignment.testId == testId &&
        user.id == ua.userId &&
        ua.assignment.title.toLowerCase() == 'test' &&
        ua.isComplete == false
      ) {
        return ua
      }
    })
    return oneUserAssignment
  }

  submit() {
    let grade = 0
    let userAssignment = this.findUserAssignment()
    const {user, assignment, userassignment} = this.props
    console.log(this.state.submit, userAssignment)
    if (this.state.submit < 1) {
      const {allRows} = this.state

      let c = document.getElementsByClassName('a')

      for (let i = 0; i < c.length; i++) {
        if (c[i].checked) {
          if (c[i].value === c[i].placeholder) {
            c[i].innerHTML = ' <div className="green">hello</div>'
            this.setState(
              this.state.answers.add({
                a: c[i].value,
                b: c[i].placeholder,
                isCorrect: true
              })
            )
          } else if (c[i].value !== c[i].placeholder) {
            this.setState(
              this.state.answers.add({
                a: c[i].value,
                b: c[i].placeholder,
                isCorrect: false
              })
            )
          }
        }
      }
      let count = 0
      console.log(allRows)
      let totalQ = allRows[0].length
      let correct = this.state.answers.forEach(ans => {
        if (ans.isCorrect) {
          count++
          return ans
        }
      })
      grade = 100 / totalQ * count * 1
      this.setState({grade: grade})
      console.log(this.state.answers, grade, correct)
      this.setState(prevState => {
        return {submit: prevState.submit + 1}
      })
    }
    this.setState(prevState => {
      return {submit: prevState.submit + 1}
    })
    console.log(this.state.submit)
    let id = assignment.find(as => as.testId == this.props.match.params.testId)
      .id

    console.log(
      this.state.submit,
      id,
      assignment,
      this.props.match.params.testId,
      userAssignment.id
    )
    this.props.completeAssignment(userAssignment.id * 1, {
      grade: grade,
      isComplete: true,
      courseId: this.props.match.params.id,
      userId: user.id,
      assignmentId: id,
      userName: `${user.firstName}  ${user.lastName}`
    })
  }
  checkStudent() {
    const {test, isTest, userassignment} = this.props
    //this.state.isStudent
    let assignmentForStudent = userassignment.find(
      assignment => assignment.courseId == this.props.match.params.id
    )
    let endDate = moment(assignmentForStudent.assignment.endDate)
    console.log(endDate, moment(), userassignment)
    if (
      moment() > endDate &&
      assignmentForStudent.assignment.isComplete === false
    ) {
      console.log(true)
    }

    // console.log(
    //   userassignment,
    //   this.props.match.params.id
    //   // moment().format('YYYY-MM-DD') - userassignment.assignment.endDate
    // )
    // let assignmentForStudent = userassignment.find(
    //   assignment => assignment.courseId == this.props.match.params.id
    // )
    // let newDate =
    //   moment().format('YYYY-MM-DD') - assignmentForStudent.assignment.endDate
    // console.log(
    //   assignmentForStudent,
    //   moment().subtract(assignmentForStudent.assignment.endDate),
    //   newDate
    // )
    // if (
    //   assignmentForStudent.isComplete === false
    //   //moment().format('YYYY-MM-DD') - assignmentForStudent.assignment.endDate <
    //   // 0
    // ) {
    //   console.log(true)
    // }
  }
  timer(timer) {
    //var timer = 8000, //in seconds for now
    if (this.state.count === 0) {
      this.setState(prevState => {
        return {count: prevState.count++}
      })
      console.log(this.state.count)
      let minutes, seconds
      setInterval(function() {
        if (document.getElementById('safeTimerDisplay')) {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10)

          minutes = minutes < 10 ? '0' + minutes : minutes
          seconds = seconds < 10 ? '0' + seconds : seconds

          document.getElementById('safeTimerDisplay').textContent =
            minutes + ':' + seconds

          if (--timer < 0) {
            timer = 0
            // timer = duration; // uncomment this line to reset timer automatically after reaching 0
          }
        }
      }, 1000)
    }
  }
  // componentWillUnmount() {
  //   this.timer(0)
  // }
  componentDidMount() {
    this.timer(8000)
    this.generateTest()
  }
  render() {
    const {test, isTest, assignment} = this.props

    const {grade, allRows} = this.state
    this.checkStudent()
    console.log(test, isTest, this.props, allRows[0], assignment)
    return (
      <div>
        {!isTest ? (
          <div>
            {grade > 0 ? <h1>{grade}</h1> : ''}
            <div id="safeTimerDisplay" />
            <Timer seconds={60} />
            <h1>TEST: {test.name}</h1>
            <form
              // action="/course/3/assignments"
              onSubmit={e => {
                e.preventDefault()
                this.submit()
                console.log(e)
              }}
            >
              {allRows[0]
                ? allRows[0].map((row, i) => {
                    let id = v4()
                    //console.log(row)
                    return (
                      <div className="quistionContainer" key={i}>
                        <h3>{row.question}</h3>
                        <div className="radioButtons">
                          <div className="mark" />
                          <input
                            placeholder={row.answer}
                            type="radio"
                            name={id}
                            value={row.a}
                            className="a"
                          />
                          <label htmlFor="a">{row.a}</label>

                          <input
                            placeholder={row.answer}
                            type="radio"
                            className="a"
                            name={id}
                            value={row.b}
                          />
                          <label htmlFor="b">{row.b}</label>

                          <input
                            placeholder={row.answer}
                            type="radio"
                            className="a"
                            name={id}
                            value={row.c}
                          />
                          <label htmlFor="c">{row.c}</label>

                          <input
                            placeholder={row.answer}
                            type="radio"
                            className="a"
                            name={id}
                            value={row.d}
                          />
                          <label htmlFor="d">{row.d}</label>
                        </div>
                      </div>
                    )
                  })
                : ''}
              <input type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          <hr />
        )}
      </div>
    )
  }
}

const mapState = ({test, user, userassignment, assignment}) => {
  return {
    isTest: !!test.test,
    test,
    user,
    userassignment,
    assignment
  }
}
const mapDispatch = dispatch => {
  return {
    completeAssignment: (id, obj) => {
      console.log(obj)
      dispatch(updateUserassignment(id, obj))
    }
  }
}

export default connect(mapState, mapDispatch)(TestStudent)
