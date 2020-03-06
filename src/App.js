import React, { Component } from "react";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.timer = React.createRef();
    this.state = {
      isOn: false,
      list: [],
      m1: 0,
      m2: 0,
      s1: 0,
      s2: 0,
      ms1: 0,
      ms2: 0,
      title: "start"
    };
  }

  handleDelete = item => {
    let newList = this.state.list.filter(v => v !== item);
    this.setState({
      list: newList
    });
  };

  handleWatch = () => {
    if (!this.state.isOn) {
      this.timer = setInterval(() => {
        if (this.state.ms2 < 9) {
          this.setState({
            ms2: this.state.ms2 + 1
          });
        } else if (this.state.ms1 < 9) {
          this.setState({
            ms2: 0,
            ms1: this.state.ms1 + 1
          });
        } else if (this.state.s2 < 9) {
          this.setState({
            ms2: 0,
            ms1: 0,
            s2: this.state.s2 + 1
          });
        } else if (this.state.s1 < 6) {
          this.setState({
            ms2: 0,
            ms1: 0,
            s2: 0,
            s1: this.state.s1 + 1
          });
        } else if (this.state.m2 < 9) {
          this.setState({
            ms2: 0,
            ms1: 0,
            s2: 0,
            s1: 0,
            m2: this.state.m2 + 1
          });
        } else {
        }
      }, 100);

      this.setState({
        isOn: true,
        title: "stop"
      });
    } else {
      clearInterval(this.timer);
      this.setState({
        isOn: false,
        title: "start"
      });
    }
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({
      m1: 0,
      m2: 0,
      s1: 0,
      s2: 0,
      ms1: 0,
      ms2: 0,
      isOn: false,
      title: "start"
    });
  };

  handleSplit = () => {
    this.setState({
      list: [
        ...this.state.list,
        [
          this.state.m1,
          this.state.m2,
          this.state.s1,
          this.state.s2,
          this.state.ms1,
          this.state.ms2
        ]
      ]
    });
    console.log(this.state.list, "list");
  };

  render() {
    const { list, title, m1, m2, s1, s2, ms1, ms2 } = this.state;
    console.log(list);
    return (
      <div>
        <p>
          {m1}
          {m2}:{s1}
          {s2}.{ms1}
          {ms2}
        </p>
        <button onClick={this.handleWatch}>{title}</button>
        <button onClick={this.handleReset}>reset</button>
        <button onClick={this.handleSplit}>split</button>
        {list.map((item, index) => (
          <div>
            <p key={index}>
              {item[0]}
              {item[1]}:{item[2]}
              {item[3]}.{item[4]}
              {item[5]}
            </p>
            <button key={index} onClick={() => this.handleDelete(item)}>
              delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}
