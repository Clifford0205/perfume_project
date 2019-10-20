import React from 'react';
import MyNavbar from '../component/MyNavbar';
import Language from '../component/Language';
import ReactFullpage from '@fullpage/react-fullpage';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import store from '../store/index.js';
import './LandingPage.scss';
import { getProducteAction } from '../store/actionCreators.js';
import { Link, withRouter } from 'react-router-dom';
import 'animate.css/animate.min.css';
import {} from 'react-icons/fa';
import MyGooglemap from '../component/GoogleMap';
import Bottomform from '../component/Bottomform';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = store.getState();
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
    if (this.mounted) {
      const action = getProducteAction();
      store.dispatch(action);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLeave(origin, destination, direction) {
    // // console.log('Leaving section ' + origin.index);
  }

  afterLoad(origin, destination, direction) {
    // let body = document.getElementsByTagName('body');
    // // console.log('After load: ' + destination.index);
    // // console.log(body[0].className);
  }

  render() {
    // console.log(this.state.productList);

    if (this.state.productList.length === 0) return null;
    return (
      <>
        <MyNavbar />
        <ReactFullpage
          anchors={[
            'firstPage',
            'secondPage',
            'thirdPage',
            'fourthPage',
            'fifthPage',
          ]}
          licenseKey={'YOUR_KEY_HERE'}
          sectionsColor={[]}
          scrollOverflow={true}
          onLeave={this.onLeave.bind(this)}
          afterLoad={this.afterLoad.bind(this)}
          render={({ state, fullpageApi }) => {
            // let data = this.state.productList;

            // // console.log(data);
            // if (data.length === 0) return null;

            return (
              <div id="fullpage-wrapper" className="LandingPage">
                <div className="section section1">
                  <Container fluid={true} className="theVision">
                    <Row>
                      <Col className="first-col">
                        <div className="imgarea d-flex">
                          <Carousel>
                            <Carousel.Item>
                              <img
                                className="d-block slider-img"
                                src="https://shoplineimg.com/5cc80df915c071000101084d/5d146daccb574871584ba324/2000x.webp?source_format=jpg"
                                alt="First slide"
                              />
                              <Carousel.Caption>
                                <h3>
                                  {this.state.chinese
                                    ? '藉由香氣尋找與記憶'
                                    : 'Looking for and remembering with aroma'}
                                </h3>
                                <p></p>
                              </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block slider-img"
                                src="https://shoplineimg.com/5cc80df915c071000101084d/5d146df1b0b0cf001a9f0ce2/2000x.webp?source_format=jpg"
                                alt="Third slide"
                              />

                              <Carousel.Caption>
                                <h3>
                                  {this.state.chinese
                                    ? '幸福就像香水，灑給別人也一定會感染自己'
                                    : 'Happiness is like perfume, and sprinkling on others will definitely infect yourself.'}
                                </h3>
                                <p></p>
                              </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block slider-img"
                                src="https://shoplineimg.com/5cc80df915c071000101084d/5d146dc480fd5b002915a6f2/2000x.webp?source_format=jpg"
                                alt="Third slide"
                              />

                              <Carousel.Caption>
                                <h3>
                                  {this.state.chinese
                                    ? '每次用香水，都像是赴一場約會'
                                    : 'Every time I use perfume, it’s like going to a date.'}
                                </h3>
                                <p></p>
                              </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                              <img
                                className="d-block slider-img"
                                src="https://shoplineimg.com/5cc80df915c071000101084d/5d146ddac2f1e6002c7b9f93/2000x.webp?source_format=jpg"
                                alt="Third slide"
                              />

                              <Carousel.Caption>
                                <h3>
                                  {this.state.chinese
                                    ? '有人說，幸​​福那就是靈魂的香水'
                                    : 'Some people say that fortunately, that is the perfume of the soul.'}
                                </h3>
                                <p></p>
                              </Carousel.Caption>
                            </Carousel.Item>
                          </Carousel>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>

                <div className="section secondPage">
                  <Container fluid={true} className="videopage">
                    <Row className="content">
                      <Col className="align-self-center">
                        <div className="page2-textArea d-flex">
                          <div className="mx-auto  align-self-center forpose">
                            <div className="title">
                              <h3>
                                {this.state.chinese
                                  ? '香味是ㄧ種沉默的語言，是一段獨一無二的旅程'
                                  : 'Scent is a silent language, a unique journey'}
                              </h3>
                            </div>
                            <video
                              id="myVideo"
                              loop
                              muted
                              autoPlay
                              data-autoplay=""
                            >
                              <source
                                src="/video/flowers.mp4"
                                type="video/mp4"
                              />
                              <source
                                src="/video/flowers.webm"
                                type="video/webm"
                              />
                            </video>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>

                <div className="section thirdPage">
                  <Container fluid={true} className="aboutus">
                    <Row className="content">
                      <Col className="align-self-center">
                        <div className="page3-textArea d-flex">
                          <div className="mx-auto  align-self-center">
                            <h2 className="text-center page2-title">
                              {this.state.chinese ? '關於我們' : 'ABOUT US'}
                            </h2>
                            <Row>
                              <Col
                                md={6}
                                className="align-items-center justify-content-center d-flex"
                              >
                                {this.state.chinese ? (
                                  <p className="">
                                    嗅覺是唯一先反應後思考的感官 <br />
                                    在嗅聞某樣事物時 鼻子裡的氣味分子接收器
                                    <br />
                                    會闢出一條通暢無阻的道路 直達大腦皮質系統
                                    <br />
                                    而那正是控制情緒 記憶與幸福感的區域 <br />
                                  </p>
                                ) : (
                                  <p className="">
                                    Smell is the only sensory that reacts first
                                    and then thinks <br />
                                    molecule receiver in the nose while sniffing
                                    something
                                    <br />
                                    Will create an unobstructed path to the
                                    cerebral cortex system
                                    <br />
                                    And that is the area that controls emotional
                                    memory and happiness. <br />
                                  </p>
                                )}
                              </Col>
                              <Col md={6}>
                                <h5>
                                  <img
                                    src="/images/p3.webp"
                                    alt=""
                                    className="w-100"
                                  />
                                </h5>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>

                <div className="section fourthPage">
                  <Container fluid={true} className="product">
                    <Row className="content">
                      <Col className="align-self-center ">
                        <h2 className="text-center page4-title transition text-center">
                          {this.state.chinese ? '烏德之香' : 'THE HOUSE OF OUD'}
                        </h2>
                        <Row className="product-area">
                          <Col
                            xs={6}
                            md={3}
                            className="d-flex justify-content-center"
                          >
                            <Link
                              to={
                                '/ProductDetail/' + this.state.productList[0].id
                              }
                            >
                              <img
                                src={this.state.productList[0].imglist[0].img}
                                alt=""
                              />
                              <p className="text-center">
                                {this.state.chinese
                                  ? this.state.productList[0].chinese.title
                                  : this.state.productList[0].english.title}
                              </p>
                              <p className="text-center">
                                {this.state.chinese ? '價格' : 'PRICE'}:
                                {this.state.productList[0].price}
                              </p>
                            </Link>
                          </Col>
                          <Col
                            xs={6}
                            md={3}
                            className="d-flex justify-content-center"
                          >
                            <Link
                              to={
                                '/ProductDetail/' + this.state.productList[1].id
                              }
                            >
                              <img
                                src={this.state.productList[1].imglist[0].img}
                                alt=""
                              />

                              <p className="text-center">
                                {this.state.chinese
                                  ? this.state.productList[1].chinese.title
                                  : this.state.productList[1].english.title}
                              </p>
                              <p className="text-center">
                                {this.state.chinese ? '價格' : 'PRICE'}:
                                {this.state.productList[1].price}
                              </p>
                            </Link>
                          </Col>
                          <Col
                            xs={6}
                            md={3}
                            className="d-flex justify-content-center"
                          >
                            <Link
                              to={
                                '/ProductDetail/' + this.state.productList[2].id
                              }
                            >
                              <img
                                src={this.state.productList[2].imglist[0].img}
                                alt=""
                              />

                              <p className="text-center">
                                {this.state.chinese
                                  ? this.state.productList[2].chinese.title
                                  : this.state.productList[2].english.title}
                              </p>
                              <p className="text-center">
                                {this.state.chinese ? '價格' : 'PRICE'}:
                                {this.state.productList[2].price}
                              </p>
                            </Link>
                          </Col>
                          <Col
                            xs={6}
                            md={3}
                            className="d-flex justify-content-center"
                          >
                            <Link
                              to={
                                '/ProductDetail/' + this.state.productList[3].id
                              }
                            >
                              <img
                                src={this.state.productList[3].imglist[0].img}
                                alt=""
                              />

                              <p className="text-center">
                                {this.state.chinese
                                  ? this.state.productList[3].chinese.title
                                  : this.state.productList[3].english.title}
                              </p>
                              <p className="text-center">
                                {this.state.chinese ? '價格' : 'PRICE'}:
                                {this.state.productList[3].price}
                              </p>
                            </Link>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </div>

                <div className="section fifthPage">
                  <Container fluid={true} className="contact-page">
                    <Row className="content">
                      <Col className="align-self-center">
                        <h2 className="text-center page5-title">
                          {this.state.chinese ? '聯絡我們' : 'CONTACT US'}
                        </h2>
                        <div
                          id="map"
                          className="mx-auto mt-4 position-relative"
                        >
                          <MyGooglemap />
                        </div>
                        <Bottomform />
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            );
          }}
        />
        <Language />
      </>
    );
  }
}

export default withRouter(LandingPage);
