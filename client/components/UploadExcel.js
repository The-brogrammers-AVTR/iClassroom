import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
const XLSX = require('xlsx')
import TestTeacher from './test/TestTeacher'
import TestStudent from './TestStudent'
import {getTest, createTest, deleteTest} from '../store/tests'
import {createAssignmentTest} from '../store/assignment'
import {connect} from 'react-redux'
const moment = require('moment')

class UploadExcel extends Component {
  constructor() {
    super()
    this.state = {
      allRows: [],
      assignmentName: '',
      courseId: '',
      teacherId: '',
      category: '',
      description: '',
      startDate: '',
      endDate: '',
      testId: 0
    }
    this.upload = this.upload.bind(this)
    this.generateTest = this.generateTest.bind(this)
    this.delete = this.delete.bind(this)
  }
  upload(e) {
    let reader = new FileReader()
    let fileName = e.target.files[0].name
    console.log(e.target, e.target.files[0].name)
    reader.readAsArrayBuffer(e.target.files[0])
    reader.onload = async e => {
      let data = new Uint8Array(reader.result)
      //data = data.toLocaleString()
      this.props.create({
        name: fileName,
        test: Object.entries(data)
      })
    }
  }
  generateTest(e) {
    const {test} = this.props
    let toFind = e.target.value
    console.log(toFind, test)
    let found = test.find(elem => {
      return elem.name === toFind
    })
    console.log(found.test)

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
  delete(e) {
    this.props.delete(e.target.value)
  }
  componentDidMount() {
    console.log('componets mount')
    this.props.load()
  }
  render() {
    const {test, user} = this.props
    console.log(this.props, user)
    return (
      <div>
        <input type="file" onChange={this.upload} />

        <select onChange={this.generateTest}>
          <option>--select test--</option>
          {test
            ? test.map(t => {
                return (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                )
              })
            : ''}
        </select>
        <select onChange={this.delete}>
          <option>--select delete--</option>
          {test
            ? test.map(t => {
                return (
                  <option
                    key={t.id}
                    value={t.id}
                    style={{backgroundColor: 'orange'}}
                  >
                    {t.name}
                  </option>
                )
              })
            : ''}
        </select>
        <TestTeacher allRows={this.state.allRows} />
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
            }}
          >
            <h2>Create Test</h2>
            <input
              type="text"
              value={this.state.assignmentName}
              placeholder="test name"
              onChange={e => {
                this.setState({assignmentName: e.target.value})
              }}
            />
            <input
              type="text"
              value={this.props.match.params.id}
              placeholder="id"
              onChange={e => {
                this.setState({courseId: e.target.value})
              }}
            />
            <input
              type="text"
              value={this.state.category}
              placeholder="category"
              onChange={e => {
                this.setState({category: e.target.value})
              }}
            />
            <input
              type="text"
              value={this.state.description}
              placeholder="description"
              onChange={e => {
                this.setState({description: e.target.value})
              }}
            />
            <input
              type="text"
              value={moment().format('YYYY-MM-DD')}
              placeholder="start date"
              onChange={e => {
                this.setState({startDate: e.target.value})
              }}
            />
            <input
              type="text"
              value={this.state.endDate}
              placeholder="end date"
              onChange={e => {
                this.setState({endDate: e.target.value})
              }}
            />
            <input
              type="text"
              value={this.props.user.id}
              placeholder="teacher id"
              onChange={e => {
                this.setState({teacherId: e.target.value})
              }}
            />
            <select
              onChange={e => {
                this.setState({testId: e.target.value})
              }}
            >
              <option>--Upload Test--</option>
              {test
                ? test.map(t => {
                    return (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    )
                  })
                : ''}
            </select>
            <button
              onClick={() =>
                this.props.createTest(
                  {
                    title: this.state.assignmentName,
                    category: this.state.category,
                    description: this.state.description,
                    startDate: moment().format('YYYY-MM-DD'),
                    endDate: this.state.endDate,
                    userId: this.props.user.id,
                    courseId: this.props.match.params.id * 1,
                    testId: this.state.testId
                  },
                  this.props.history.push
                )
              }
            >
              create
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = ({test, user}) => {
  return {
    test,
    user
  }
}
const mapDispatch = dispatch => {
  return {
    load: () => {
      console.log('gettest form upload')
      dispatch(getTest())
    },
    create: testObj => {
      dispatch(createTest(testObj))
    },
    createTest: (testObj, push) => {
      dispatch(createAssignmentTest(testObj, push))
    },
    delete: id => {
      dispatch(deleteTest(id))
    }
  }
}
export default withRouter(connect(mapState, mapDispatch)(UploadExcel))
