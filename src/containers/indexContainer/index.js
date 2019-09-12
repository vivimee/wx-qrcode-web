import React, { Component } from 'react';
import './index.less';

export default class AContainer extends Component {
  async componentDidMount() {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('promise done');
      }, 3000);
    });
    console.log(res);
  }

  doSomething = () => {
    console.log('do');
  }

  render() {
    return (
      <div>
        <h3>hello world ～ Index</h3>
        <button onClick={this.doSomething} type="button">button</button>
      </div>
    );
  }
}
