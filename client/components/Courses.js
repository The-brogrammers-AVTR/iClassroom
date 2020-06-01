import React from 'react'
import {connect} from 'react-redux'
import CourseCard from './CourseCard.js'

class Courses extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {courses} = this.props
    // let filteredProducts
    // if (category !== 'all') {
    //   filteredProducts = products.filter(
    //     (product) => product.category === category
    //   )
    // } else {
    //   filteredProducts = products
    // }

    return (
      <div className="search-bar">
        <ul className="wrapper">
          {courses.map(course => {
            return <CourseCard key={course.id} {...course} />
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({courses, user}) => {
  return {courses, user}
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(getCourses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
