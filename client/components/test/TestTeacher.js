import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
const XLSX = require('xlsx')
import {connect} from 'react-redux'
import {v4} from 'uuid'

class TestTeacher extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      answers: new Set(),
      grade: 0,
      submit: 0
    }
    this.submit = this.submit.bind(this)
  }
  submit() {
    console.log(this.state.submit)
    if (this.state.submit < 1) {
      const {test, allRows} = this.props

      let c = document.getElementsByClassName('radio')
      for (let i = 0; i < c.length; i++) {
        if (c[i].checked) {
          if (c[i].value === c[i].placeholder) {
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
      let totalQ = allRows[0].length
      let correct = this.state.answers.forEach(ans => {
        if (ans.isCorrect) {
          count++
          return ans
        }
      })
      let grade = 100 / totalQ * count * 1
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
  }
  render() {
    const {test, isTest, allRows} = this.props
    const {grade} = this.state
    console.log(test, isTest, this.props, allRows[0])
    return (
      <div>
        {grade > 0 ? <h1>{grade}</h1> : ''}
        <h3>Step 2: Confirm Uploaded TEST: {test.name}</h3>
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
                    <h3 className="question">{`${i + 1}. ${row.question}`}</h3>
                    <div className="radioButtons">
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
          {/* <input type="submit" value="Submit" /> */}
        </form>
      </div>
    )
  }
}

const mapState = ({test}) => {
  return {
    isTest: !!test.test,
    test
  }
}

export default connect(mapState)(TestTeacher)
