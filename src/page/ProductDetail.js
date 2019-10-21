import React from 'react';

import MyNavbar from '../component/MyNavbar';
import Language from '../component/Language';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import store from '../store/index.js';
import './ProductDetail.scss';
import {
  getProducteAction,
  changeImgAction,
  plusNumAction,
  minusNumAction,
  InputChangeAction,
  bigMessageAction,
  littleMsgAction,
  addCartAction,
  totalZeroAction,
} from '../store/actionCreators.js';
import { withRouter } from 'react-router-dom';
import 'animate.css/animate.min.css';

class ProductDetail extends React.Component {
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
    let action = '';
    action = getProducteAction();
    store.dispatch(action);
    action = changeImgAction();
    store.dispatch(action);
    action = totalZeroAction();
    store.dispatch(action);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChangeimg = e => {
    // console.log(e.currentTarget);
    var now_img = e.target.getAttribute('src');
    const action = changeImgAction(now_img);
    store.dispatch(action);
    var node = e.currentTarget.parentNode;
    var node_li = node.querySelectorAll('li');
    // console.log(node.childNodes.length);
    // console.log(node_li);
    for (var i = 0; i < node_li.length; i++) {
      node_li[i].classList.remove('active');
    }
    e.currentTarget.classList.add('active');
    for (var m = 0; m < node.childNodes.length; m++) {}
  };

  handlePlus = () => {
    const action = plusNumAction();
    store.dispatch(action);
  };

  handleMinus = () => {
    const action = minusNumAction();
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

  handleFormInputChange = e => {
    const action = InputChangeAction(e.target.value, e.target.name);
    store.dispatch(action);
  };

  handleBigmessage = () => {
    if (this.state.Big_message.trim() === '') {
      alert('請輸入留言');
      return;
    }

    if (this.state.Big_message.length < 10) {
      alert('留言長度過短');
      return;
    }

    alert('留言成功');
    // console.log(this.state.productList);
    const theProductData = this.state.productList.find(
      item => item.p_sid === +this.props.match.params.id
    );

    const product_id = this.props.match.params.id;
    const member = this.state.my_name ? this.state.my_name : '匿名';

    if (theProductData.message.length === 0) {
      const big_message = {
        message: {
          message: [
            {
              text: member + ':' + this.state.Big_message,
              id: 1,
              little_message: [],
            },
          ],
        },
        product_id: product_id,
      };

      let action = '';
      action = bigMessageAction(big_message);
      store.dispatch(action);
      return;
    }

    if (theProductData.message.length !== 0) {
      // theProductMsg= theProductData
      // console.log(theProductData.message.slice(-1)[0].id);
      let lastid = theProductData.message.slice(-1)[0].id;
      let oldmsg = theProductData.message;
      const big_message = {
        message: {
          message: [
            ...oldmsg,
            {
              text: member + ':' + this.state.Big_message,
              id: lastid + 1,
              little_message: [],
            },
          ],
        },
        product_id: product_id,
      };
      let action = '';
      action = bigMessageAction(big_message);
      store.dispatch(action);
      return;
    }
  };

  handlelittlemessage = e => {
    const theProductData = this.state.productList.find(
      item => item.p_sid === +this.props.match.params.id
    );
    //拿到該產品所有留言
    // console.log(theProductData.message);
    //拿出所有留言中的大留言，用來對比
    var result = theProductData.message.map(item => item.text);
    // console.log(result);
    //是在哪一個大留言下做小留言
    // console.log(e.target.parentNode);
    let thisLi = e.target.parentNode;
    let Bmsg = thisLi.querySelector('p').innerHTML;
    // console.log(Bmsg); //大留言的文字

    var whichone = result.indexOf(Bmsg);
    // console.log(whichone);
    //小留言輸入框的值
    let littliemsg = thisLi.querySelector('textarea').value;
    // console.log(littliemsg);

    //該產品所有留言
    let newmsg = theProductData.message;
    let o_littleMsg = theProductData.message[whichone].little_message;
    const member = this.state.my_name ? this.state.my_name : '匿名';
    // console.log(o_littleMsg);
    //小留言的id
    let little_lastid =
      o_littleMsg.length === 0 ? 0 : o_littleMsg.slice(-1)[0].id;
    // console.log(little_lastid);

    //哪一個產品
    const product_id = this.props.match.params.id;

    //替換掉哪一則大留言
    newmsg.splice(whichone, 1, {
      text: Bmsg,
      id: whichone + 1, //大留言的id
      little_message: [
        ...o_littleMsg,
        { text: member + ':' + littliemsg, id: little_lastid + 1 },
      ],
    });
    // console.log(newmsg);

    //傳遞給API的資料
    const little_message = {
      message: {
        message: newmsg,
      },
      product_id: product_id,
    };

    const action = littleMsgAction(little_message);
    store.dispatch(action);

    thisLi.querySelector('textarea').value = '';

    // // console.log(little_message.message.message);
  };

  handleCart = () => {
    if (!this.state.my_name) {
      alert('請先登入會員');
      return;
    }

    if (this.state.little_total === 0) {
      alert('請選擇數量');
      return;
    }

    const theProductData = this.state.productList.find(
      item => item.p_sid === +this.props.match.params.id
    );

    //該品項價錢
    let price = theProductData.price;

    //該品項名稱
    let product_name = theProductData.chinese.title;

    // console.log(theProductData.imglist[0].img);
    let img = theProductData.imglist[0].img;
    //該品項id
    let product_id = +this.props.match.params.id;
    //該品項數量
    let amount = this.state.little_total;

    let cart_id = '';
    // console.log(this.state.my_cart.length);
    if (this.state.my_cart.length !== 0) {
      cart_id = this.state.my_cart.slice(-1)[0].id + 1;
    } else {
      cart_id = 1;
    }

    // console.log(this.state.my_cart.slice(-1));

    const cart_data = {
      m_mail: this.state.my_mail,
      m_password: this.state.my_pswd,
      m_name: this.state.my_name,
      m_mobile: this.state.my_mobile,
      m_birthday: this.state.my_birthday,
      buy_record: this.state.my_buy_record,
      shopping_cart: [
        ...this.state.my_cart,
        {
          product_id: product_id,
          product_name: product_name,
          amount: amount,
          id: cart_id,
          price: price,
          img: img,
        },
      ],
      id: this.state.my_id,
    };
    const action = addCartAction(cart_data);
    store.dispatch(action);
  };

  render() {
    console.log(this.state);
    // console.log(this.state.productList);
    const theProductData = this.state.productList.find(
      item => item.p_sid === +this.props.match.params.id
    );
    // // console.log(theProductData);
    // // console.log(theProductData !== undefined);

    if (theProductData === undefined) return null;
    // console.log(theProductData);
    return (
      <>
        {/* <GoBack /> */}
        <MyNavbar />
        <div className="ProductDetail">
          <section className="bg-img">
            <img src="/images/egg.webp" alt="" className="w-100" />
          </section>
          <Container className="top-area">
            <Row>
              <Col lg={8}>
                <div className="d-flex">
                  <div className="gallary">
                    <ul className="ga-ul">
                      {theProductData.imglist.map(item => (
                        <li key={item.id} onClick={this.handleChangeimg}>
                          <img src={item.img} alt="" />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="big-img mx-auto">
                    <p className="text-center">
                      <img
                        src={
                          this.state.now_img
                            ? this.state.now_img
                            : theProductData.imglist[0].img
                        }
                        alt=""
                      />
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={4} className="mt-4">
                <h4 className="text-center">
                  {this.state.chinese
                    ? theProductData.chinese.title
                    : theProductData.english.title}
                </h4>
                <p>
                  NT$
                  {theProductData.price}
                </p>
                <p className="small">{this.state.chinese ? '尺寸' : 'SIZE'}</p>
                <p>{this.state.chinese ? '淡香精75 ML' : 'Essence 75 ML'}</p>

                <p>{this.state.chinese ? '數量' : 'Quality'}</p>
                <div className="d-flex mt-3">
                  <Button
                    className="d-block mx-auto"
                    onClick={this.handleMinus}
                  >
                    -
                  </Button>
                  <input
                    type="text"
                    value={this.state.little_total}
                    className="form-control"
                    readOnly
                  />
                  <Button className="d-block mx-auto" onClick={this.handlePlus}>
                    +
                  </Button>
                </div>
                <Button
                  className="d-block mx-auto w-100 mt-3"
                  onClick={this.handleCart}
                  variant="info"
                >
                  {this.state.chinese ? '加入購物車' : 'Add to Cart'}
                </Button>
              </Col>
            </Row>

            {/* 商品描述區域 */}

            {/* 標題選單 */}
            <Row>
              <Col>
                <ul className="d-flex   my-3 choose-title">
                  <li
                    className="w-100 text-center the-title active"
                    id="product-detail"
                    onClick={this.handleTitleClick}
                  >
                    {this.state.chinese ? '商品描述' : 'Describe'}
                  </li>
                  <li
                    className="w-100  text-center the-title "
                    id="pay-way"
                    onClick={this.handleTitleClick}
                  >
                    {this.state.chinese
                      ? '送貨及付款方式'
                      : 'Shipping and Payment'}
                  </li>
                </ul>
              </Col>
            </Row>
            {/* 標題選單 */}

            <Row className="mb-5">
              <Col>
                <div className="product-detail thehide show">
                  <h4 className="text-center my-4">
                    {this.state.chinese ? '商品描述' : 'Describe'}
                  </h4>
                  <h5 className="text-center my-4 font-weight-bold">
                    {this.state.chinese
                      ? theProductData.chinese.describe_title2
                      : theProductData.english.describe_title2}
                  </h5>
                  <div className="describe-text my-4">
                    <p>
                      {this.state.chinese
                        ? theProductData.chinese.describe_text
                        : theProductData.english.describe_text}
                    </p>
                  </div>

                  <div className="flavor-text">
                    <h5 className="text-center mt-5 font-weight-bold">
                      {this.state.chinese
                        ? '香氛表現'
                        : 'Fragrance Performance'}
                    </h5>
                    <p>
                      {this.state.chinese
                        ? theProductData.chinese.flavor
                        : theProductData.english.flavor}
                    </p>
                  </div>
                </div>

                <div className="pay-way thehide">
                  <h4 className="text-center my-4"> 送貨及付款方式</h4>
                  <Row>
                    <Col className="delivery">
                      <h5 className="text-center">送貨方式</h5>
                      <p className="text-center">
                        7-11 取貨不付款 (B2C) 全家 取貨不付款 (B2C) 大嘴鳥宅配通
                      </p>
                    </Col>

                    <Col className="pay-method">
                      <h5 className="text-center">付款方式 ATM</h5>
                      <p className="text-center">
                        虛擬代碼繳費（需持代碼至實體ATM或網路銀行繳費）
                        信用卡（支援Visa, Master, JCB） 銀行轉帳／ATM
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="message-board">
                  <ul>
                    <p
                      style={{
                        display: `${
                          theProductData.message.length === 0 ? 'block' : 'none'
                        }`,
                      }}
                    >
                      目前沒有留言
                    </p>
                    {theProductData.message.map(item => (
                      <li key={item.id}>
                        <p>{item.text}</p>

                        <ul className="little-ul">
                          {item.little_message.map(item2 => (
                            <li className="little-li" key={item2.id}>
                              <p>{item2.text}</p>
                            </li>
                          ))}
                        </ul>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          className="little-input mt-3"
                          name="little_message"
                          placeholder=""
                          onChange={this.handleFormInputChange}
                        />
                        <Button
                          variant="dark"
                          className=" mt-2  d-block ml-auto"
                          onClick={this.handlelittlemessage}
                        >
                          回復留言
                        </Button>
                      </li>
                    ))}
                  </ul>

                  <Form.Control
                    as="textarea"
                    rows="3"
                    className="message-input mt-3"
                    name="Big_message"
                    placeholder="請輸入10個字以上的留言"
                    value={this.state.Big_message}
                    onChange={this.handleFormInputChange}
                  />
                  <Button
                    variant="dark"
                    className=" mt-2  d-block ml-auto"
                    onClick={this.handleBigmessage}
                  >
                    送出留言
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>

          <Language />
        </div>
      </>
    );
  }
}

export default withRouter(ProductDetail);
