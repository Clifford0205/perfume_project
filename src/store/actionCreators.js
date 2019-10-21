import {
  LANGUAGE_CHANGE,
  PRODUCT_FILTER_CHANGE,
  HANDLE_INPUT_CHANGE,
  HANDLE_FORM_SEND,
  CLEAN_ALL_INPUT,
  GET_PRODUCT,
  PRODUCT_IN_LIST,
  PAGE_CHANGE,
  MEMBER_REGISTER,
  MEMBER_IN_LIST,
  REGISTER_MODAL_SHOW,
  REGISTER_MODAL_CLOSE,
  LOGIN_MODAL_SHOW,
  LOGIN_MODAL_CLOSE,
  LOGOUT_MODAL_SHOW,
  LOGOUT_MODAL_CLOSE,
  CLEAN_STORAGE,
  MEMBER_LOGIN,
  LOGIN_STATE,
  EDIT_MEMBER,
  EDIT_PASSWORD,
  CHANGE_IMG,
  PLUS_NUM,
  MINUS_NUM,
  BIG_MESSAGE,
  CLEAN_BIG_MESSAGE,
  LITTLE_MESSAGE,
  ADD_CART,
  DELETE_CART,
  CLEAN_RECIPIENT,
  ZONE_LOAD,
  ZONE_CHANGE,
  ZONE_STATE,
  CREDIT_CARD,
  PAY_WAY,
  ADD_ORDER,
  NEW_RECIPIENT,
  LITTLE_TOTAL_TO_ZERO,
  GET_ALL_MEMBER,
} from './actionTypes.js';

//專案

export const memberInListAction = data => ({
  type: MEMBER_IN_LIST,
  data,
});

export const getAllmemberAction = () => ({
  type: GET_ALL_MEMBER,
});

export const cleanBigMessage = () => ({
  type: CLEAN_BIG_MESSAGE,
});

export const totalZeroAction = () => ({
  type: LITTLE_TOTAL_TO_ZERO,
});

export const newRecipientAction = () => ({
  type: NEW_RECIPIENT,
});
export const addInorderAction = data => ({
  type: ADD_ORDER,
  data,
});

export const payWayAction = (value, name) => ({
  type: PAY_WAY,
  value,
  name,
});

export const cardNumberAction = cardnum => ({
  type: CREDIT_CARD,
  cardnum,
});

export const zoneSaveAction = (value, name) => ({
  type: ZONE_STATE,
  value,
  name,
});
export const zoneChangeAction = townops => ({
  type: ZONE_CHANGE,
  townops,
});

export const loadZoneAction = (cityops, townops) => ({
  type: ZONE_LOAD,
  cityops,
  townops,
});

export const cleanRecipientAction = () => ({
  type: CLEAN_RECIPIENT,
});
export const deleteCartAction = delItem => ({
  type: DELETE_CART,
  delItem,
});

export const addCartAction = cart_data => ({
  type: ADD_CART,
  cart_data,
});

export const littleMsgAction = little_message => ({
  type: LITTLE_MESSAGE,
  little_message,
});

export const bigMessageAction = big_message => ({
  type: BIG_MESSAGE,
  big_message,
});

export const plusNumAction = () => ({
  type: PLUS_NUM,
});

export const minusNumAction = () => ({
  type: MINUS_NUM,
});

export const changeImgAction = now_img => ({
  type: CHANGE_IMG,
  now_img,
});

export const editPasswordAction = edit_pswd => ({
  type: EDIT_PASSWORD,
  edit_pswd,
});

export const editMemberAction = edit_data => ({
  type: EDIT_MEMBER,
  edit_data,
});

export const checkLoginState = userdata => ({
  type: LOGIN_STATE,
  userdata,
});

export const cleanlocalstorage = () => ({
  type: CLEAN_STORAGE,
});

export const memberLoginAction = login_data => ({
  type: MEMBER_LOGIN,
  login_data,
});

export const logoutModalShowAction = () => ({
  type: LOGOUT_MODAL_SHOW,
});

export const logoutModalCloseAction = () => ({
  type: LOGOUT_MODAL_CLOSE,
});

export const loginModalShowAction = () => ({
  type: LOGIN_MODAL_SHOW,
});

export const loginModalCloseAction = () => ({
  type: LOGIN_MODAL_CLOSE,
});

export const memberModalShowAction = () => ({
  type: REGISTER_MODAL_SHOW,
});

export const memberModalCloseAction = () => ({
  type: REGISTER_MODAL_CLOSE,
});

export const memberRegisterAction = m_data => ({
  type: MEMBER_REGISTER,
  m_data,
});

export const setProductfilter = id => ({
  type: PRODUCT_FILTER_CHANGE,
  id,
});

export const InputChangeAction = (value, name) => ({
  type: HANDLE_INPUT_CHANGE,
  value,
  name,
});

export const sendmessageAction = item => ({
  type: HANDLE_FORM_SEND,
  item,
});

export const cleanInputAction = () => ({
  type: CLEAN_ALL_INPUT,
});

export const getProducteAction = () => ({
  type: GET_PRODUCT,
});

export const ProductInListActopn = data => ({
  type: PRODUCT_IN_LIST,
  data,
});

export const paginateChangeAction = item => ({
  type: PAGE_CHANGE,
  item,
});

export const languageChangeAction = () => ({
  type: LANGUAGE_CHANGE,
});

//專案
