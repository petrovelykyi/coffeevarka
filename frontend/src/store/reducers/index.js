import { combineReducers } from 'redux';
import filtersReducer from './filters';
import productsReducer from './products';
import queryParamsReducer from './queryParams';
import orderItemsReducer from './orderItems';
import cardReducer from './card';
import authenticationReducer from './authentication';
import loginRegistrationReducer from './loginRegistration';
import searchReducer from './search';
import profileReducer from './profile';
import citiesReducer from './cities';
import messagesReducer from './messages';

const allReducers = combineReducers({
  filtersReducer,
  productsReducer,
  queryParamsReducer,
  orderItemsReducer,
  cardReducer,
  authenticationReducer,
  loginRegistrationReducer,
  searchReducer,
  profileReducer,
  citiesReducer,
  messagesReducer,
});

export default allReducers;
