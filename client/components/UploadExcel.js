import React, {Component} from 'react'
import axios from 'axios'
const XLSX = require('xlsx')

export class UploadExcel extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.upload = this.upload.bind(this)
    this.getData = this.getData.bind(this)
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

  //let wb = XLSX.read(data, {type: 'array'})
  async getData() {
    let rowObj
    let allRows = []
    let data = await axios.get('/api/test')

    data = Object.fromEntries(data.data[0].test)
    data = Object.values(data).map(Number)
    //let a = data.split(',').map(Number)
    let wb = XLSX.read(data, {type: 'array'})
    wb.SheetNames.forEach(sheet => {
      rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheet])
      allRows.push(rowObj)
    })
    console.log('wb work book', wb, rowObj, allRows)
    let html = XLSX.write(wb, {
      sheet: 'Sheet1',
      type: 'binary',
      bookType: 'html'
    })
    document.getElementById('displayExcel').innerHTML = html
  }
  render() {
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
      </div>
    )
  }
}
