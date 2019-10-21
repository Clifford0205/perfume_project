import { takeEvery, put } from 'redux-saga/effects';
import {
  HANDLE_FORM_SEND,
  GET_PRODUCT,
  MEMBER_REGISTER,
  MEMBER_LOGIN,
  EDIT_MEMBER,
  EDIT_PASSWORD,
  BIG_MESSAGE,
  LITTLE_MESSAGE,
  ADD_CART,
  DELETE_CART,
  ADD_ORDER,
  GET_ALL_MEMBER,
} from './actionTypes.js';
import {
  cleanInputAction,
  ProductInListActopn,
  memberModalCloseAction,
  checkLoginState,
  loginModalCloseAction,
  totalZeroAction,
  cleanBigMessage,
} from './actionCreators';

//窩窩專案

//拿到首頁文章

//送出顧客意見
function* saveclientmessage(newItem) {
  // console.log(newItem.item);
  try {
    const data = newItem.item;
    const response = yield fetch('http://localhost:5555/clientmessage', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    // console.log(jsonObject);
    yield alert('您的意見已經提交');
    const action = cleanInputAction();
    // console.log(action);
    yield put(action);
  } catch (e) {
    // console.log(e);
  }
}

//拿到商品資料
function* getProductsInstate() {
  try {
    const response = yield fetch('http://localhost:5000/products ', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    // if (!response.ok) throw new Error(response.statusText);
    const jsonObject = yield response.json();
    for (let i = 0; i < jsonObject.length; i++) {
      console.log(jsonObject[i]);
    }

    jsonObject.reverse();
    const action = ProductInListActopn(jsonObject);
    // console.log(action);
    yield put(action);
  } catch (e) {
    // console.log(e);
  }
}

//拿到所有會員資料
function* getAllMemberAction() {
  try {
    const response = yield fetch('http://localhost:5555/memberdata ', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    // if (!response.ok) throw new Error(response.statusText);
    const jsonObject = yield response.json();

    const action = ProductInListActopn(jsonObject);
    // console.log(action);
    yield put(action);
  } catch (e) {
    // console.log(e);
  }
}

//會員註冊
function* addMemberAction(newItem) {
  // console.log(newItem.m_data);
  try {
    const data = newItem.m_data;
    const response = yield fetch('http://localhost:5555/memberdata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    // console.log(jsonObject);
    yield alert('註冊成功');
    let action = '';
    action = cleanInputAction();
    // // console.log(action);
    yield put(action);
    action = memberModalCloseAction();
    yield put(action);
  } catch (e) {
    // console.log(e);
  }
}

//會員登入
function* MemberLogin(newItem) {
  try {
    const mail = newItem.login_data.login_email;
    const pswd = newItem.login_data.login_password;
    const response = yield fetch(
      'http://localhost:5555/memberdata?m_mail=' + mail + '&m_password=' + pswd,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    );
    // if (!response.ok) throw new Error(response.statusText);
    const jsonObject = yield response.json();
    yield; // console.log(jsonObject);
    if (jsonObject.length !== 0) {
      alert('登入成功');
      // console.log(jsonObject[0]);
      localStorage.setItem('user', JSON.stringify(jsonObject[0]));
      // console.log(JSON.parse(localStorage.getItem('user')));
      let this_user = JSON.parse(localStorage.getItem('user'));
      // console.log(this_user);
      let action = '';
      action = checkLoginState(this_user);
      yield put(action);
      action = loginModalCloseAction();
      yield put(action);
    } else {
      alert('帳號密碼錯誤');
    }
  } catch (e) {
    // console.log(e);
  }
}

//修改會員資料
function* editMemberaction(newItem) {
  yield; // console.log(newItem.edit_data);
  const member_id = newItem.edit_data.id;
  const data = newItem.edit_data;
  // console.log(member_id);
  // console.log(data);

  const response = yield fetch(
    'http://localhost:5555/memberdata/' + member_id,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }
  );
  const jsonObject = yield response.json();
  // console.log(jsonObject);
  localStorage.setItem('user', JSON.stringify(jsonObject));
  // console.log(JSON.parse(localStorage.getItem('user')));
  let this_user = JSON.parse(localStorage.getItem('user'));
  // console.log(this_user);
  yield alert('資料修改成功');
  const action = checkLoginState(this_user);
  yield put(action);
}

//修改密碼
function* editPasswordAction(newItem) {
  yield; // console.log(newItem.edit_pswd);
  const member_id = newItem.edit_pswd.id;
  const data = newItem.edit_pswd;
  const response = yield fetch(
    'http://localhost:5555/memberdata/' + member_id,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    }
  );
  const jsonObject = yield response.json();
  // console.log(jsonObject);
  localStorage.setItem('user', JSON.stringify(jsonObject));
  // console.log(JSON.parse(localStorage.getItem('user')));
  let this_user = JSON.parse(localStorage.getItem('user'));
  // console.log(this_user);
  yield alert('密碼修改成功');
  const action = checkLoginState(this_user);
  yield put(action);
}

//大留言
function* bigMessageAction(newItem) {
  yield; // console.log(newItem.big_message.message);
  const data = newItem.big_message.message.message;
  console.log(data);
  const ptid = newItem.big_message.product_id;
  const response = yield fetch('http://localhost:5000/products/bigmsg' + ptid, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });
  const jsonObject = yield response.json();
  console.log(jsonObject);

  yield getProductsInstate();
  let action = '';
  action = cleanBigMessage();
  yield put(action);
}

//小留言
function* littleMsg(newItem) {
  const data = newItem.little_message.message;
  yield; // console.log(data);
  const ptid = newItem.little_message.product_id;
  const response = yield fetch('http://localhost:5555/products/' + ptid, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });
  // console.log(jsonObject);
  yield getProductsInstate();
}

//購物車

function* addcartAction(newItem) {
  yield; // console.log(newItem.cart_data);
  const data = newItem.cart_data;
  const mbid = newItem.cart_data.id;
  // console.log(data);
  const response = yield fetch('http://localhost:5555/memberdata/' + mbid, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });
  const jsonObject = yield response.json();
  // console.log(jsonObject);
  localStorage.setItem('user', JSON.stringify(jsonObject));
  // console.log(JSON.parse(localStorage.getItem('user')));
  let this_user = JSON.parse(localStorage.getItem('user'));
  // console.log(this_user);
  yield alert('成功加入購物車');

  let action = '';
  action = checkLoginState(this_user);
  yield put(action);
  action = totalZeroAction();
  yield put(action);
}

//刪除購物車品項

function* deleteCartAction(newItem) {
  yield; // console.log(newItem.delItem.shopping_cart);
  const data = newItem.delItem.shopping_cart;
  const id = newItem.delItem.id;
  const response = yield fetch('http://localhost:5555/memberdata/' + id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });
  const jsonObject = yield response.json();
  // console.log(jsonObject);
  localStorage.setItem('user', JSON.stringify(jsonObject));
  // console.log(JSON.parse(localStorage.getItem('user')));
  let this_user = JSON.parse(localStorage.getItem('user'));
  // console.log(this_user);
  yield alert('刪除成功');
  const action = checkLoginState(this_user);
  yield put(action);
}

//購物車到訂單
function* addInOrderAction(newItem) {
  // yield // console.log(newItem);
  const data = newItem.data.buy_record;
  const id = newItem.data.id;
  yield; // console.log(data);
  const response = yield fetch('http://localhost:5555/memberdata/' + id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  });
  const jsonObject = yield response.json();
  // console.log(jsonObject);

  localStorage.setItem('user', JSON.stringify(jsonObject));
  // console.log(JSON.parse(localStorage.getItem('user')));
  let this_user = JSON.parse(localStorage.getItem('user'));
  // console.log(this_user);
  yield alert('購買成功');
  const action = checkLoginState(this_user);
  yield put(action);
}
//窩窩專案

//generator 函數
function* mySaga() {
  //窩窩專案

  yield takeEvery(HANDLE_FORM_SEND, saveclientmessage);
  yield takeEvery(GET_PRODUCT, getProductsInstate);
  yield takeEvery(MEMBER_REGISTER, addMemberAction);
  yield takeEvery(MEMBER_LOGIN, MemberLogin);
  yield takeEvery(EDIT_MEMBER, editMemberaction);
  yield takeEvery(EDIT_PASSWORD, editPasswordAction);
  yield takeEvery(BIG_MESSAGE, bigMessageAction);
  yield takeEvery(LITTLE_MESSAGE, littleMsg);
  yield takeEvery(ADD_CART, addcartAction);
  yield takeEvery(DELETE_CART, deleteCartAction);
  yield takeEvery(ADD_ORDER, addInOrderAction);
  yield takeEvery(GET_ALL_MEMBER, getAllMemberAction);
  //窩窩專案
}

export default mySaga;
