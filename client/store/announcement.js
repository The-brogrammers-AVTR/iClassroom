import axios from 'axios'

/**
 * ACTION TYPES ------------------------------------------------
 */
const GET_ANNOUNCEMENTS = 'GET_ANNOUNCEMENTS'
const CREATE_ANNOUNCEMENT = 'CREATE_ANNOUNCEMENT'
const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT'
const REMOVE_ANNOUNCEMENT = 'REMOVE_ANNOUNCEMENT'

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getAnnouncements = announcements => ({
  type: GET_ANNOUNCEMENTS,
  announcements
})
const _createAnnouncement = announcement => ({
  type: CREATE_ANNOUNCEMENT,
  announcement
})
const _updateAnnouncement = announcement => ({
  type: UPDATE_ANNOUNCEMENT,
  announcement
})
const _removeAnnouncement = id => ({type: REMOVE_ANNOUNCEMENT, id})

/**
 * THUNK CREATORS -------------------------------------------------
 */
const getAnnouncements = () => {
  return async dispatch => {
    const response = await axios.get('/api/announcements')
    dispatch(_getAnnouncements(response.data))
  }
}

const createAnnouncement = (announcement, push) => {
  return async dispatch => {
    const response = await axios.post('/api/announcements', announcement)
    dispatch(_createAnnouncement(response.data))
    push('/')
  }
}

const updateAnnouncement = (announcement, push) => {
  return async dispatch => {
    const {data: updatedAnnouncement} = await axios.put(
      `/api/announcements/${announcement.id}`,
      announcement
    )
    dispatch(_updateAnnouncement(updatedAnnouncement))
    push('/')
  }
}

const removeAnnouncement = id => {
  return async dispatch => {
    await axios.delete(`/api/announcements/${id}`)
    dispatch(_removeAnnouncement(id))
  }
}

/**
 * REDUCER -------------------------------------------------------
 */
const announcements = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANNOUNCEMENTS:
      return action.announcements

    case CREATE_ANNOUNCEMENT:
      return [...state, action.announcement]

    case REMOVE_ANNOUNCEMENT:
      return state.filter(announcement => announcement.id !== action.id)

    case UPDATE_ANNOUNCEMENT:
      state = state.map(
        announcement =>
          announcement.id === action.announcement.id
            ? action.announcement
            : announcement
      )
      return state

    default:
      return state
  }
}

export {
  announcements,
  getAnnouncements,
  createAnnouncement,
  removeAnnouncement,
  updateAnnouncement
}
