import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_LESSONS = 'GET_LESSONS'
const CREATE_LESSON = 'CREATE_LESSON'
const UPDATE_LESSON = 'UPDATE_LESSON'
const REMOVE_LESSON = 'REMOVE_LESSON'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getLessons = lessons => ({
  type: GET_LESSONS,
  lessons
})
const _createLesson = lesson => ({
  type: CREATE_LESSON,
  lesson
})
const _updateLesson = lesson => ({
  type: UPDATE_LESSON,
  lesson
})
const _removeLesson = id => ({type: REMOVE_LESSON, id})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getLessons = () => {
  return async dispatch => {
    const response = await axios.get('/api/lessons')
    dispatch(_getLessons(response.data))
  }
}

const createLesson = (lesson, push, id) => {
  return async dispatch => {
    const response = await axios.post('/api/lessons', lesson)
    dispatch(_createLesson(response.data))
    push(`/course/${id}/lessons`)
  }
}

const updateLesson = (lesson, push) => {
  return async dispatch => {
    const {data: updatedLesson} = await axios.put(
      `/api/lessons/${lesson.id}`,
      lesson
    )
    dispatch(_updateLesson(updatedLesson))
    push('/')
  }
}

const removeLesson = id => {
  return async dispatch => {
    await axios.delete(`/api/lessons/${id}`)
    dispatch(_removeLesson(id))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
const lessons = (state = initialState, action) => {
  switch (action.type) {
    case GET_LESSONS:
      return action.lessons

    case CREATE_LESSON:
      return [...state, action.lesson]

    case REMOVE_LESSON:
      return state.filter(lesson => lesson.id !== action.id)

    case UPDATE_LESSON:
      state = state.map(
        lesson => (lesson.id === action.lesson.id ? action.lesson : lesson)
      )
      return state

    default:
      return state
  }
}

export {lessons, getLessons, createLesson, removeLesson, updateLesson}
