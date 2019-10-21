import React from 'react';
import './MyNavbar.scss';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import store from '../store/index.js';
import './RegisterModal.scss';

import { withRouter } from 'react-router-dom';

import {
  InputChangeAction,
  getAllmemberAction,
  memberRegisterAction,
} from '../store/actionCreators.js';

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.mounted = false;
    store.subscribe(this.handleStoreChange);
    // console.log(this.state);
  }

  handleStoreChange = () => {
    if (this.mounted) {
      this.setState(store.getState());
    }
  };

  //生命週期:一開始載入資料
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleFormInputChange = e => {
    const action = InputChangeAction(e.target.value, e.target.name);
    store.dispatch(action);
  };

  handleMemberRegister = () => {
    let action = '';
    let isPassed = true;

    let allMail = [];
    allMail = this.state.memberList.map(item => item.m_mail);

    console.log(allMail);

    const m_data = {
      m_mail: this.state.m_mail,
      m_password: this.state.m_password,
      m_name: this.state.m_name,
      m_mobile: this.state.m_mobile,
      m_birthday: this.state.m_birthday,
      buy_record: '[]',
      shopping_cart: '[]',
    };

    //手機號碼驗證
    let mobile_pattern = /^09\d{2}-?\d{3}-?\d{3}$/;
    // console.log(document.querySelector('.m_mobile').value);
    if (!mobile_pattern.test(document.querySelector('.m_mobile').value)) {
      document.querySelector('.m_mobile').style.borderColor = 'red';
      document.querySelector('.m_mobileHelp').innerHTML =
        '請填寫正確的手機號碼!';
      isPassed = false;
    }

    //Email驗證
    let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!email_pattern.test(document.querySelector('.m_mail').value)) {
      document.querySelector('.m_mail').style.borderColor = 'red';
      document.querySelector('.m_mailHelp').innerHTML = '請填寫正確的E-mail!';
      isPassed = false;
    }
    if (allMail.find(item => item === this.state.m_mail)) {
      document.querySelector('.m_mail').style.borderColor = 'red';
      document.querySelector('.m_mailHelp').innerHTML = 'E-mail重複使用';
      isPassed = false;
    }

    if (document.querySelector('.m_name').value.trim() === '') {
      document.querySelector('.m_name  ').style.borderColor = 'red';
      document.querySelector('.m_nameHelp').innerHTML = '請填寫姓名';
      isPassed = false;
    }

    //密碼驗證
    if (
      document.querySelector('.m_password').value !==
      document.querySelector('.m_repassword').value
    ) {
      document.querySelector('.m_password').style.borderColor = 'red';
      document.querySelector('.m_passwordHelp').innerHTML =
        '兩次密碼輸入不一致!';

      document.querySelector('.m_repassword').style.borderColor = 'red';
      document.querySelector('.m_repasswordHelp').innerHTML =
        '兩次密碼輸入不一致!';
      isPassed = false;
    }

    if (isPassed) {
      action = memberRegisterAction(m_data);
      // console.log(action);
      store.dispatch(action);
    }
  };

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
          className="RegisterModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>會員註冊</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={6}>
                  E-MAIL
                  <input
                    type="text"
                    className="w-100 form-control m_mail"
                    name="m_mail"
                    onChange={this.handleFormInputChange}
                    value={this.state.m_mail}
                  />
                  <p className="m_mailHelp" style={{ color: 'red' }}></p>
                </Col>

                <Col md={6}>
                  密碼
                  <input
                    type="password"
                    className="w-100 form-control m_password"
                    name="m_password"
                    onChange={this.handleFormInputChange}
                    value={this.state.m_password}
                  />
                  <p className="m_passwordHelp" style={{ color: 'red' }}></p>
                </Col>
                <Col md={6}>
                  確認密碼
                  <input
                    type="password"
                    className="w-100 form-control m_repassword"
                    name="m_repassword"
                    onChange={this.handleFormInputChange}
                    value={this.state.m_repassword}
                  />
                  <p className="m_repasswordHelp" style={{ color: 'red' }}></p>
                </Col>
                <Col md={6}>
                  真實姓名
                  <input
                    type="text"
                    className="w-100 form-control m_name"
                    name="m_name"
                    onChange={this.handleFormInputChange}
                    value={this.state.m_name}
                  />
                  <p className="m_nameHelp" style={{ color: 'red' }}></p>
                </Col>
                <Col md={6}>
                  手機號碼
                  <input
                    type="text"
                    className="w-100 form-control m_mobile"
                    name="m_mobile"
                    onChange={this.handleFormInputChange}
                    value={this.state.m_mobile}
                  />
                  <p className="m_mobileHelp" style={{ color: 'red' }}></p>
                </Col>
                <Col md={6}>
                  生日
                  <input
                    type="date"
                    className="w-100 form-control"
                    name="m_birthday"
                    onChange={this.handleFormInputChange}
                    value={this.state.m_birthday}
                  />
                </Col>

                <Col>
                  <Button
                    className="d-block mx-auto mt-3 "
                    variant="success"
                    onClick={this.handleMemberRegister}
                  >
                    確認送出
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(RegisterModal);
