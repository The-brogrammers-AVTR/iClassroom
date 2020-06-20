import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
const XLSX = require('xlsx')
import {connect} from 'react-redux'
import {v4} from 'uuid'

class TestStudent extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      answers: new Set(),
      grade: 0,
      submit: 0,
      allRows: []
    }
    this.submit = this.submit.bind(this)
    this.generateTest = this.generateTest.bind(this)
  }

  generateTest() {
    let testNumber = this.props.match.params.testId
    const {test} = this.props
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

  submit() {
    const {user} = this.props
    console.log(this.state.submit)
    if (this.state.submit < 1) {
      const {allRows} = this.state
      let grade = 0
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
    this.props.completeAssignment({
      grade: grade,
      isComplete: true,
      courseId: this.props.match.params.id,
      userId: user.id
    })
  }
  componentDidMount() {
    this.generateTest()
  }
  render() {
    const {test, isTest} = this.props
    const {grade, allRows} = this.state
    console.log(test, isTest, this.props, allRows[0])
    return (
      <div>
        {grade > 0 ? <h1>{grade}</h1> : ''}
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
    )
  }
}

const mapState = ({test, user}) => {
  return {
    isTest: !!test.test,
    test,
    user
  }
}

export default connect(mapState)(TestStudent)
