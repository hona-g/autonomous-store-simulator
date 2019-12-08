import React from 'react';
import './App.css';
import store from './res/Store1.png';
import outside_img from './res/outside.png';
import hall_img from './res/hall.png';
import mart_img from './res/mart.png';
import refund_img from './res/refund.png';
import Cart from './components/Cart';
import { fetch_goods } from './functions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'outside',
      goods: {},
      goodsitem: {},
      cartitem: {},
    }

    this.fetch_goods = fetch_goods()
      .then(res => {
        this.setState({
          goods: JSON.parse(res.goods),
          goodsitem: JSON.parse(res.goodsitem),
        });
      });
  }


  render() {
    const { goods, goodsitem, location } = this.state;
    const container = [];

    let location_word;
    let viewer = [];

    if(location == 'outside') {
      location_word = "가게 밖";
      viewer.push(<img src={outside_img} alt=""/>);
      container.push(
        <div>
          <input type="button" value="매장 입장" onClick={() => this.setState({ location: 'hall' })}/>
          <input type="button" value="아무 것도 안함" />
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
          <input type="button" value="가게나가기" onClick={() => this.setState({ location: 'outside' })}/>
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
        setState={(obj)=>this.setState(obj)}
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
            <p className="App-Subtitle"> [N-Team] 임환규(201411235), 문승훈(200000000) </p>
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
                    <div> 고객 이름 : <font>{'lhg'}</font> </div>
                    <div> 고객 등급 : <font>{'gold'}</font> </div>

                    <hr/>
                    {container}
                    <hr/>
                  </td>
                </tr>
              </table>
            </p>
          </p>
        </body>
      </div>
    );
  }
}

export default App;
