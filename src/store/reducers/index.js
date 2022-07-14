import { combineReducers } from 'redux'
import cognitoUser from './cognitoUser'
import partner from './partner'

const reducers = combineReducers({
  cognitoUser,
  partner
})

export default reducers
