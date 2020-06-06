import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class StudentList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {filteredStudents} = this.props
    return (
      <div className="wrapper">
        <div className="studentlist-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Overall Grade</th>
                <th>Student Report</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents &&
                filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>A</td>
                    <td>
                      <Link to="/"> Student Report</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({students}) => {
  return {
    students
  }
}

export default connect(mapStateToProps)(StudentList)
