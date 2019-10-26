import React from 'react';
import store from '../store/index.js';
import './Bottomform.scss';
import { Row, Col, Button } from 'react-bootstrap';
import {
  InputChangeAction,
  sendmessageAction,
} from '../store/actionCreators.js';

export class Bottomform extends React.Component {
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

  handleFormSend = () => {
    if (
      this.state.clientname.trim() === '' ||
      this.state.phonenumber.trim() === '' ||
      this.state.mail.trim() === '' ||
      this.state.message.trim() === ''
    ) {
      alert('請輸入完整的資料喔');
      return;
    }
    const item = {
      clientname: this.state.clientname,
      phonenumber: this.state.phonenumber,
      mail: this.state.mail,
      message: this.state.message,
    };
    // const stateList = this.state.list;
    // // console.log(stateList);
    // console.log(item);
    const action = sendmessageAction(item);
    // console.log(action);
    store.dispatch(action);
  };
  render() {
    return (
      <div className="Bottomform mx-auto">
        <Row className=" ">
          <Col md={6}>
            <p className="long">
              {this.state.chinese
                ? '要是有任何問題，請不用吝嗇，馬上寫下您寶貴的建議給我們，我們將馬上有專人聯繫您'
                : "If you have any questions, please don't hesitate to write down your valuable suggestions and we will contact you immediately."}
            </p>

            <p className="short">
              {this.state.chinese ? '留下資料' : 'Leave Message'}
            </p>
          </Col>
          <Col md={6}>
            <input
              type="text"
              placeholder="Name"
              className="forminput mx-auto d-block my-2"
              name="clientname"
              value={this.state.clientname ? this.state.clientname : ''}
              onChange={this.handleFormInputChange}
            />
            <input
              type="text"
              placeholder="Phone number"
              className="forminput mx-auto d-block my-2"
              name="phonenumber"
              value={this.state.phonenumber ? this.state.phonenumber : ''}
              onChange={this.handleFormInputChange}
            />
            <input
              type="text"
              placeholder="Mail"
              className="forminput mx-auto d-block my-2"
              name="mail"
              value={this.state.mail ? this.state.mail : ''}
              onChange={this.handleFormInputChange}
            />
            <input
              type="text"
              placeholder="Message"
              className="forminput mx-auto d-block my-2"
              name="message"
              value={this.state.message ? this.state.message : ''}
              onChange={this.handleFormInputChange}
            />
          </Col>
        </Row>
        <Row>
          <span className="bg-border mx-auto">
            <Button
              variant=" d-block"
              className="sendbtn"
              onClick={this.handleFormSend}
            >
              Send
            </Button>
          </span>
        </Row>
      </div>
    );
  }
}

export default Bottomform;
