import { combineReducers } from 'redux'
import userReducer from './user/reducers'
import productReducer from './product/reducers'

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
})

export default rootReducer
