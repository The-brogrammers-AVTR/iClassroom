import React, {Component} from 'react'
import axios from 'axios'
const XLSX = require('xlsx')
import TestTeacher from './test/TestTeacher'
import {getTest} from '../store/tests'
import {connect} from 'react-redux'

class UploadExcel extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      allRows: []
    }
    this.upload = this.upload.bind(this)
    this.generateTest = this.generateTest.bind(this)
  }
  upload(e) {
    let reader = new FileReader()

    reader.readAsArrayBuffer(e.target.files[0])
    reader.onload = async e => {
      let data = new Uint8Array(reader.result)
      //data = data.toLocaleString()

      let a = await axios.post('/api/test', {
        name: this.state.name,
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

  //let wb = XLSX.read(data, {type: 'array'})
  // async getData() {
  //   let rowObj
  //   let allRows = []
  //   let testObj = {}
  //   let data = await axios.get('/api/test')
  //   console.log(data.data[0].name)
  //   data = Object.fromEntries(data.data[0].test)
  //   data = Object.values(data).map(Number)
  //   //let a = data.split(',').map(Number)
  //   let wb = XLSX.read(data, {type: 'array'})
  //   wb.SheetNames.forEach(sheet => {
  //     rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet])
  //     allRows.push(rowObj)
  //   })
  //   console.log('wb work book', wb, rowObj, allRows)
  //   let html = XLSX.write(wb, {
  //     sheet: 'Sheet1',
  //     type: 'binary',
  //     bookType: 'html'
  //   })
  //   document.getElementById('displayExcel').innerHTML = html
  // }
  componentDidMount() {
    console.log('componets mount')
    this.props.load()
  }
  render() {
    const {test} = this.props
    console.log(test)
    return (
      <div>
        <input type="file" onChange={this.upload} />
        <input
          type="text"
          placeolder="name of test"
          onChange={e => {
            this.setState({name: e.target.value})
          }}
        />
        <button onClick={this.getData}>upload</button>
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
        <TestTeacher allRows={this.state.allRows} />
      </div>
    )
  }
}

const mapState = ({test}) => {
  return {
    test
  }
}
const mapDispatch = dispatch => {
  return {
    load: () => {
      console.log('gettest form upload')
      dispatch(getTest())
    }
  }
}
export default connect(mapState, mapDispatch)(UploadExcel)
