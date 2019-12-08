import React from 'react';
import './App.css';
import store from './res/Store1.png';
import outside_img from './res/outside.png';
import hall_img from './res/hall.png';
import mart_img from './res/mart.png';
import refund_img from './res/refund.png';
import Cart from './components/Cart';
import Customer from './components/Customer';
import {
  fetch_goods,
  fetch_customers,
  add_customers,
  detect_user,
  anti_theft,
  make_trade,
  remove_stock,
} from './functions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'outside',
      goods: {},
      goodsitem: {},
      customers: {},
      cartitem: {},
      user: {
        id: 0,
        name: "",
        age: 0,
      },
      message: ['Start Auto-Store Simulation'],
    }

    const { cartitem, user, goods, goodsitem } = this.state;

    this.fetch_goods = fetch_goods()
      .then(res => {
        this.setState({
          goods: JSON.parse(res.goods),
          goodsitem: JSON.parse(res.goodsitem),
        });
      });

    this.fetch_customers = fetch_customers()
      .then(res => {
        this.state.message.unshift(res.message);
        this.setState({
          customers: res.customer,
        });
      });

    this.add_customers = (id, name, age) => add_customers(id, name, age)
      .then(res => {
        fetch_customers().then(res => {
          this.state.message.unshift(JSON.stringify(res));
          this.setState({
            customers: res.customer,
          });
        });
        this.setState({});
      });

    this.enter_hall = (id) => {
      detect_user(id).then(res => {
        this.state.message.unshift('카메라1 : ' + res.message);
        this.setState({
          location: 'hall',
          user: res.customer
        });
      });
    };

    this.exit_hall = (id, stole) => {
      const { cartitem } = this.state;
      detect_user(id).then(res => {
        this.state.message.unshift('카메라2 : ' + res.message);
        this.setState({
          location: 'outside',
        });
      }).then(() => {
        let itemcnt = 0;
        Object.keys(cartitem).forEach((item) => {
          itemcnt += cartitem[item];
        });
        if(itemcnt > 0) {
          anti_theft(id, cartitem).then((res)=>{
            this.state.message.unshift('도난방지장치 : ' + res.message);
            this.setState({
              location: 'hall',
            });
          });
        }
      });
    };

    this.make_trade = (cart) => {
      detect_user(this.state.user.id).then(res => {
        let customerID = res.id;
        return customerID;
      }).then((customerID) => {
        let gross = 0;
        Object.keys(this.state.cartitem).forEach((item) => {
          gross += this.state.goods[item].price;
        });
        make_trade(customerID, cart, gross).then((res=>{
          this.state.message.unshift('자동결제 : ' + res.message);
          this.state.message.unshift('사용한금액 : ' + gross);

          remove_stock(this.state.cartitem)
          .then((res) => {
            this.state.message.unshift('재고관리 : 판매한 재고 감소');
            this.setState({
              location: 'hall',
              cartitem: {},
            });
            fetch_goods().then(res => {
              this.setState({
                goods: JSON.parse(res.goods),
                goodsitem: JSON.parse(res.goodsitem),
              })
            });

          });


        }))
      });
    };
  }


  render() {
    const { goods, goodsitem, location, cartitem, user, customers, message } = this.state;
    const { add_customers, enter_hall, exit_hall, make_trade } = this;
    const container = [];

    let location_word;
    let viewer = [];

    if(location == 'outside') {
      location_word = "가게 밖";
      viewer.push(<img src={outside_img} alt=""/>);
      container.push(
        <div>
          <Customer
            customers={customers}
            enter_hall={enter_hall}
            add_customers={add_customers}
            setState={(obj)=>this.setState(obj)}
          />

        </div>
      );
    }

    if(location == 'hall') {
      location_word = "매장 홀";
      viewer.push(<img src={hall_img} alt=""/>);
      container.push(
        <div>
          <input type="button" value="장보기" onClick={() => this.setState({ location: 'mart' })}/>
          <input type="button" value="환불하기" onClick={() => this.setState({ location: 'refund' })}/>
          <input type="button" value="가게나가기" onClick={() => exit_hall(user.id)}/>
          <input type="button" value="아무 것도 안함" />
        </div>
      );
    }

    if(location == 'mart') {
      location_word = "장보는 중";
      viewer.push(<img src={mart_img} alt=""/>);
      container.push(<Cart
        fetch_goods={this.fetch_goods}
        goods={goods}
        goodsitem={goodsitem}
        location={location}
        cartitem={cartitem}
        setState={(obj)=>this.setState(obj)}
        make_trade={make_trade}
        />);
    }

    if(location == 'refund') {
      location_word = "환불 중";
      viewer.push(<img src={refund_img} alt=""/>);
      container.push(
        <div>
          <input type="button" value="돌아가기" onClick={() => this.setState({ location: 'hall' })}/>
          <input type="button" value="아무 것도 안함" />
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <p className="App-Title"> Autonomous Store System
            <p className="App-Subtitle"> [N-Team] 임환규(201411235), 문승훈(201714284) </p>
          </p>
        </header>
        <body>
          <p className="Viewer">
            <p className = "Container">
              <table className="Dividor">
                <tr>
                  <td>{viewer}</td>
                  <td className="Board">
                    <div> 고객 상태 : <font><b>{location_word}</b></font> </div>
                    <div> 고객 이름 : <font>{user.name}</font> </div>
                    <div> 고객 등급 : <font>{user.tier?user.tier:'없음'}</font> </div>
                    <hr/>
                    {container}
                    <hr/>
                  </td>
                </tr>
              </table>
            </p>
            <h1>SERVER Message</h1>
            <div className="Console">
            {
              message.map((row)=>{
                return(<div>{row}<br /></div>);
              })
            }
            </div>
          </p>
        </body>
      </div>
    );
  }
}

export default App;
