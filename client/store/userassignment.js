import axios from 'axios'

//ACTION TYPES
export const READ_USERASSIGNMENT = 'READ_USERASSIGNMENT'
export const READ_USERASSIGNMENTS = 'READ_USERASSIGNMENTS'
export const UPDATE_USERASSIGNMENT = 'UPDATE_USERASSIGNMENT'

//ACTION CREATORS
const _readUserassignment = userassignment => {
  return {
    type: READ_USERASSIGNMENT,
    userassignment
  }
}

const _readUserassignments = userassignments => {
  return {
    type: READ_USERASSIGNMENTS,
    userassignments
  }
}

const _updateUserassignment = userassignment => {
  return {
    type: UPDATE_USERASSIGNMENT,
    userassignment
  }
}

//THUNK CREATORS
export const readUserassignment = id => {
  return async dispatch => {
    const _userassignment = (await axios.get(`/api/userassignments/${id}`)).data
    dispatch(_readUserassignment(_userassignment))
  }
}

export const readUserassignments = () => {
  return async dispatch => {
    const userassignments = (await axios.get('/api/userassignments')).data
    dispatch(_readUserassignments(userassignments))
  }
}

export const updateUserassignment = (id, userassignment) => {
  return async dispatch => {
    const updatedUserassignment = (await axios.put(
      `/api/userassignments/${id}`,
      userassignment
    )).data
    dispatch(_updateUserassignment(updatedUserassignment))
  }
}

// const updateProfile = (user, id, push) => {
//   return async dispatch => {
//     const {data: updatedUser} = await axios.put(`/api/users/${id}`, user)
//     console.log('from store after data base', {data: updatedUser}, this)
//     dispatch(_updateProfile(updatedUser))
//     //push('/')
//   }
// }

// const updateItem = (orderId, quantity, cartId) => {
//   return async dispatch => {
//     if (cartId !== 'offline') {
//       //handle logged in uder
//       const updatedItem = (await axios.put(`/api/orderProducts/${orderId}`, {
//         quantity
//       })).data
//       dispatch(_updateItem(updatedItem))
//     } else {
//       // handle logged out user
//       console.log('updated item for logged out user')
//       const cart = JSON.parse(sessionStorage.cart)
//       const updatedOrderProducts = cart.orderProducts.map(orderProduct => {
//         if (orderProduct.id === orderId) {
//           orderProduct.quantity = quantity
//           orderProduct.totalPrice = orderProduct.product.price * quantity
//         }
//         return orderProduct
//       })
//       cart.orderProducts = updatedOrderProducts
//       sessionStorage.cart = JSON.stringify(cart)
//       dispatch(
//         _updateItem(
//           updatedOrderProducts.find(orderProduct => orderProduct.id === orderId)
//         )
//       )
//     }
//   }
// }

//REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case READ_USERASSIGNMENT:
      return action.userassignment
    case READ_USERASSIGNMENTS:
      return action.userassignments
    case UPDATE_USERASSIGNMENT:
      return state.map(
        userassignment =>
          userassignment.id === action.userassignment.id
            ? action.userassignment
            : userassignment
      )
    default:
      return state
  }
}
