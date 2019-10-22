import React from 'react';
import Language from '../component/Language';
import MyNavbar from '../component/MyNavbar';
import { Container, Button } from 'react-bootstrap';
import store from '../store/index.js';
import './MemberEdit.scss';
import { Redirect, withRouter } from 'react-router-dom';
import 'animate.css/animate.min.css';
import {
  InputChangeAction,
  editMemberAction,
  editPasswordAction,
} from '../store/actionCreators.js';

class MemberEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
    // console.log(this.state);
  }

  handleStoreChange = () => {
    this.setState(store.getState());
    // // console.log('store change');
  };

  //生命週期:一開始載入資料
  componentDidMount() {
    // console.log(url_id);
    // console.log(state_id);
  }

  handleFormInputChange = e => {
    const action = InputChangeAction(e.target.value, e.target.name);
    store.dispatch(action);
  };

  //修改會員資料
  handleMemberModify = () => {
    const edit_data = {
      edit_data: {
        m_mail: this.state.my_mail,
        m_password: this.state.my_pswd,
        m_name: this.state.my_name,
        m_mobile: this.state.my_mobile,
        m_birthday: this.state.my_birthday,
        shopping_cart: JSON.stringify(this.state.my_cart),
        buy_record: JSON.stringify(this.state.my_buy_record),
      },
      id: this.state.my_id,
    };

    //手機號碼驗證
    let mobile_pattern = /^09\d{2}-?\d{3}-?\d{3}$/;
    // console.log(document.querySelector('.m_mobile').value);
    if (!mobile_pattern.test(this.state.my_mobile)) {
      document.querySelector('.m_mobile').style.borderColor = 'red';
      document.querySelector('.m_mobileHelp').innerHTML =
        '請填寫正確的手機號碼!';
      return;
    }

    //Email驗證
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!email_pattern.test(this.state.my_mail)) {
      document.querySelector('.m_mail').style.borderColor = 'red';
      document.querySelector('.m_mailHelp').innerHTML = '請填寫正確的E-mail!';
      return;
    }

    const action = editMemberAction(edit_data);
    // console.log(action);
    store.dispatch(action);
  };

  handleTitleClick = e => {
    // console.log(e.target.id);
    let allhide = document.querySelectorAll('.thehide');
    let alltitle = document.querySelectorAll('.the-title');
    for (let i = 0; i < allhide.length; i++) {
      allhide[i].classList.remove('show');
    }
    for (let i = 0; i < alltitle.length; i++) {
      alltitle[i].classList.remove('active');
    }

    document.querySelector(`.${e.target.id}`).classList.add('show');
    document.querySelector(`#${e.target.id}`).classList.add('active');
  };

  handleModifyPassword = () => {
    if (this.state.old_password !== this.state.my_pswd) {
      alert('舊密碼輸入錯誤');
      console.log(typeof this.state.my_pswd);
      console.log(typeof this.state.old_password);
      return;
    }

    if (this.state.new_password !== this.state.new_password2) {
      alert('兩次密碼輸入不一致');
      return;
    }

    if (
      this.state.new_password.trim() === '' ||
      this.state.new_password2.trim() === ''
    ) {
      alert('密碼不可為空值');
      return;
    }

    const edit_pswd = {
      edit_pswd: {
        m_mail: this.state.my_mail,
        m_password: this.state.new_password,
        m_name: this.state.my_name,
        m_mobile: this.state.my_mobile,
        m_birthday: this.state.my_birthday,
        shopping_cart: JSON.stringify(this.state.my_cart),
        buy_record: JSON.stringify(this.state.my_buy_record),
      },
      id: this.state.my_id,
    };
    const action = editPasswordAction(edit_pswd);
    store.dispatch(action);
  };

  render() {
    console.log(this.state);
    if (
      this.state.my_id !== +this.props.match.params.id &&
      this.state.my_id &&
      +this.props.match.params.id
    ) {
      return <Redirect to="/" />;
    } else
      return (
        <>
          <MyNavbar />
          <Container className="MemberEdit">
            <section>
              <img src="/images/2000x.webp" alt="" className="w-100" />
            </section>
            <Container className="pb-5">
              <h2 className="text-center">會員中心</h2>
              <ul className="d-flex   my-3 choose-title">
                <li
                  className="w-100 text-center the-title active"
                  id="profile"
                  onClick={this.handleTitleClick}
                >
                  編輯個人檔案
                </li>
                <li
                  className="w-100  text-center the-title "
                  id="password"
                  onClick={this.handleTitleClick}
                >
                  修改密碼
                </li>
              </ul>

              <div className="profile thehide show">
                <ul>
                  <li>
                    姓名:
                    <input
                      type="text"
                      value={this.state.my_name}
                      name="my_name"
                      onChange={this.handleFormInputChange}
                      className="form-control"
                    />
                  </li>

                  <li>
                    E-MAIL:
                    <input
                      type="text"
                      value={this.state.my_mail}
                      name="my_mail"
                      onChange={this.handleFormInputChange}
                      className="form-control m_mail"
                    />
                    <p className="m_mailHelp" style={{ color: 'red' }}></p>
                  </li>

                  <li>
                    手機號碼:
                    <input
                      type="text"
                      value={this.state.my_mobile}
                      name="my_mobile"
                      onChange={this.handleFormInputChange}
                      className="form-control m_mobile"
                    />
                    <p className="m_mobileHelp" style={{ color: 'red' }}></p>
                  </li>

                  <li>
                    生日:
                    <input
                      type="date"
                      value={this.state.my_birthday}
                      name="my_birthday"
                      onChange={this.handleFormInputChange}
                      className="form-control"
                    />
                  </li>
                </ul>

                <Button
                  className="d-block mx-auto  "
                  onClick={this.handleMemberModify}
                >
                  修改資料
                </Button>
              </div>
              <div className="password thehide">
                <ul>
                  <li>
                    目前密碼:
                    <input
                      type="text"
                      value={this.state.old_password}
                      name="old_password"
                      onChange={this.handleFormInputChange}
                      className="form-control"
                    />
                  </li>

                  <li>
                    新密碼:
                    <input
                      type="text"
                      value={this.state.new_password}
                      name="new_password"
                      onChange={this.handleFormInputChange}
                      className="form-control"
                    />
                  </li>

                  <li>
                    確認密碼:
                    <input
                      type="text"
                      value={this.state.new_password2}
                      name="new_password2"
                      onChange={this.handleFormInputChange}
                      className="form-control"
                    />
                  </li>
                </ul>

                <Button
                  className="d-block mx-auto  "
                  onClick={this.handleModifyPassword}
                >
                  修改密碼
                </Button>
              </div>
            </Container>
          </Container>

          {/* <Language /> */}
        </>
      );
  }
}

export default withRouter(MemberEdit);
