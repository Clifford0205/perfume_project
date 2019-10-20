import React from 'react';
import './MyNavbar.scss';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import store from '../store/index.js';
import './LoginModal.scss';
import { withRouter } from 'react-router-dom';

import {
  InputChangeAction,
  memberLoginAction,
} from '../store/actionCreators.js';

class LoginModal extends React.Component {
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

  handleMemberLogin = () => {
    const login_data = {
      login_email: this.state.login_email,
      login_password: this.state.login_password,
    };
    const action = memberLoginAction(login_data);
    // console.log(action);
    store.dispatch(action);
  };

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
          className="LoginModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>會員登入</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={12} className="">
                  帳號(E-MAIL)
                  <input
                    type="text"
                    className="w-100 form-control "
                    name="login_email"
                    onChange={this.handleFormInputChange}
                    value={this.state.login_email}
                  />
                </Col>
                <Col md={12} className="mt-3">
                  密碼
                  <input
                    type="password"
                    className="w-100 form-control "
                    name="login_password"
                    onChange={this.handleFormInputChange}
                    value={this.state.login_password}
                  />
                </Col>

                <Col>
                  <Button
                    className="d-block mx-auto mt-3"
                    onClick={this.handleMemberLogin}
                    variant="dark"
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

export default withRouter(LoginModal);
