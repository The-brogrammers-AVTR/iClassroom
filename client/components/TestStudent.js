import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
const XLSX = require('xlsx')
import {connect} from 'react-redux'
import {v4} from 'uuid'
import {updateUserassignment} from '../store/userassignment'
const moment = require('moment')
import Countdown from 'react-countdown'

const renderer = ({hours, minutes, seconds, completed}) => {
  if (completed) {
    document.getElementById('testSubmit').disabled = true
    // Render a completed state
    return <Completionist />
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    )
  }
}

const Completionist = () => <h1>Test Is Done</h1>

class TestStudent extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      answers: new Set(),
      grade: null,
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
    if (test.length > 0) {
      //console.log(test)
      let found = test.find(elem => {
        return elem.id === testNumber * 1
      })
      //console.log(found, this.props.match.params.testId)

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
      //console.log('all rows', allRows)
    }
  }
  findUserAssignment() {
    const {userassignment, user} = this.props
    const {id, testId} = this.props.match.params
    //console.log(id, testId)
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
    let index = 0
    let grade = 0
    let userAssignment = this.findUserAssignment()
    if (userAssignment) {
      const {user, assignment, userassignment} = this.props
      //console.log(this.state.submit, userAssignment)
      if (this.state.submit < 1) {
        const {allRows} = this.state
        let d = document.getElementsByClassName('quistionContainer')
        let c = document.getElementsByClassName('radio')
        console.log('c', c, 'd', d)
        for (let i = 0; i < c.length; i++) {
          if (c[i].checked) {
            if (c[i].value === c[i].placeholder) {
              d[index].style.backgroundColor = '#c8e6c9'
              //green
              this.setState(
                this.state.answers.add({
                  a: c[i].value,
                  b: c[i].placeholder,
                  isCorrect: true
                })
              )
              index++
            } else if (c[i].value !== c[i].placeholder) {
              d[index].style.backgroundColor = '#ffcdd2'
              //red
              this.setState(
                this.state.answers.add({
                  a: c[i].value,
                  b: c[i].placeholder,
                  isCorrect: false
                })
              )
              index++
            }
          }
        }
        let count = 0
        //console.log(allRows)
        let totalQ = allRows[0].length
        let correct = this.state.answers.forEach(ans => {
          if (ans.isCorrect) {
            count++
            return ans
          }
        })
        grade = 100 / totalQ * count * 1
        this.setState({grade: grade})
        //console.log(this.state.answers, grade, correct)
        this.setState(prevState => {
          return {submit: prevState.submit + 1}
        })
      }
      this.setState(prevState => {
        return {submit: prevState.submit + 1}
      })
      //console.log(this.state.submit)
      let id = assignment.find(
        as => as.testId == this.props.match.params.testId
      ).id

      // console.log(
      //   this.state.submit,
      //   id,
      //   assignment,
      //   this.props.match.params.testId,
      //   userAssignment
      // )

      this.props.completeAssignment(userAssignment.id * 1, {
        grade: grade,
        isComplete: true,
        courseId: this.props.match.params.id,
        userId: user.id,
        assignmentId: id,
        userName: `${user.firstName}  ${user.lastName}`
      })
    } else {
      this.setState({grade: null})
    }
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

  // componentWillUnmount() {
  //   this.timer(0)
  // }
  componentDidMount() {
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
            {grade > 0 ? (
              <h1>
                {grade !== null
                  ? `Your Grade: ${grade}`
                  : ' this test not for you '}
              </h1>
            ) : (
              ''
            )}
            <div className="countDown">
              <span>Remaining Time: </span>
              <Countdown date={Date.now() + 120000} renderer={renderer} />
            </div>
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
                        <h3 className="question">{`${i + 1}. ${
                          row.question
                        }`}</h3>
                        <div className="radioButtons">
                          {/* <div className="mark" /> */}
                          <div className="choice">
                            <input
                              placeholder={row.answer}
                              type="radio"
                              name={id}
                              value={row.a}
                              className="radio"
                            />
                            <label htmlFor="a">{`a. ${row.a}`}</label>
                          </div>

                          <div className="choice">
                            <input
                              placeholder={row.answer}
                              type="radio"
                              className="radio"
                              name={id}
                              value={row.b}
                            />
                            <label htmlFor="b">{`b. ${row.b}`}</label>
                          </div>

                          <div className="choice">
                            <input
                              placeholder={row.answer}
                              type="radio"
                              className="radio"
                              name={id}
                              value={row.c}
                            />
                            <label htmlFor="c">{`c. ${row.c}`}</label>
                          </div>

                          <div className="choice">
                            <input
                              placeholder={row.answer}
                              type="radio"
                              className="radio"
                              name={id}
                              value={row.d}
                            />
                            <label htmlFor="d">{`d. ${row.d}`}</label>
                          </div>
                        </div>
                      </div>
                    )
                  })
                : ''}
              <div className="btnContainer">
                <input
                  type="submit"
                  value="Submit"
                  id="testSubmit"
                  className="submitBtn"
                />
              </div>
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
