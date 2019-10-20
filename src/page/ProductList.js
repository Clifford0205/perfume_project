import React from 'react';
import Language from '../component/Language';
import Pagination from '../component/Pagination';
import MyNavbar from '../component/MyNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import store from '../store/index.js';
import './ProductList.scss';
import {
  setProductfilter,
  getProducteAction,
} from '../store/actionCreators.js';
import { Link, withRouter } from 'react-router-dom';
import 'animate.css/animate.min.css';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
  }

  //生命週期:一開始載入資料
  componentDidMount() {
    this.mounted = true;
    const action = getProducteAction();
    if (this.mounted) {
      store.dispatch(action);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleStoreChange = () => {
    if (this.mounted) {
      this.setState(store.getState());
    }
  };

  handleClassify = e => {
    // console.log(e.target);
    let allfilter = document.querySelectorAll('.filter');
    for (let i = 0; i < allfilter.length; i++) {
      allfilter[i].classList.remove('active');
    }
    e.target.classList.add('active');
    // console.log(e.target.id);
    let action = setProductfilter(e.target.id);
    store.dispatch(action);
  };

  componentDidUpdate() {
    // console.log(this.state);
  }

  render() {
    // console.log(this.state);
    let data = this.state.productList;
    // console.log(data);

    if (this.state.productfilter && this.state.productfilter.trim() !== '') {
      data = this.state.productList.filter(item =>
        item.tag.includes(this.state.productfilter)
      );
    }

    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.postPerPage;

    const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;

    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    if (this.state.productList.length === 0) return null;

    return (
      <>
        {/* <GoBack /> */}

        <MyNavbar />

        <section>
          <img src="/images/egg.webp" alt="" className="w-100" />
        </section>

        <Container className="ProductList pb-5">
          <Row>
            <Col>
              <h3 className="text-center pt-5">
                {this.state.chinese ? '精品香水' : 'Elegant Perfume'}
              </h3>
            </Col>
          </Row>
          <Row className="classification pt-3 ">
            <Col>
              <div
                className="active filter all"
                id=" "
                onClick={e => this.handleClassify(e)}
              ></div>
            </Col>
            <Col>
              <div>
                <p
                  className="filter"
                  id="wood"
                  onClick={e => this.handleClassify(e)}
                >
                  {this.state.chinese ? '木質調' : 'WOOD'}
                </p>
              </div>
            </Col>
            <Col>
              <div>
                <p
                  className="filter"
                  id="flower"
                  onClick={e => this.handleClassify(e)}
                >
                  {this.state.chinese ? '花香調' : 'FLOWER'}
                </p>
              </div>
            </Col>
            <Col>
              <div>
                <p
                  className="filter"
                  id="ocean"
                  onClick={e => this.handleClassify(e)}
                >
                  {this.state.chinese ? '海洋調' : 'OCEAN'}
                </p>
              </div>
            </Col>
            <Col>
              <div>
                <p
                  className="filter"
                  id="tea"
                  onClick={e => this.handleClassify(e)}
                >
                  {this.state.chinese ? '茶香調' : 'TEA'}
                </p>
              </div>
            </Col>
            <Col>
              <div>
                <p
                  className="filter"
                  id="fruit"
                  onClick={e => this.handleClassify(e)}
                >
                  {this.state.chinese ? '果香調' : 'FRUIT'}
                </p>
              </div>
            </Col>
          </Row>

          <Container className="lotsCase">
            <Row>
              {currentPosts.map(item => (
                <Col sm="4" key={item.p_sid}>
                  <Link to={'/ProductDetail/' + item.p_sid}>
                    <img
                      src={item.imglist[0].img}
                      alt=""
                      width="100%"
                      className="linkimg"
                    />
                    <h5 className="linktitle">
                      {this.state.chinese
                        ? item.chinese.title
                        : item.english.title}
                    </h5>
                    <p className="linktext">
                      {this.state.chinese
                        ? item.chinese.text
                        : item.english.text}
                    </p>
                  </Link>
                </Col>
              ))}
            </Row>
            <Row>
              <Pagination totalPosts={data.length} />
            </Row>
          </Container>
        </Container>

        <Language />
      </>
    );
  }
}

export default withRouter(ProductList);
