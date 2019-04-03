import React, { Component } from "react";
import "./App.css";

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeModelYear: {},
    };
  }

  componentDidMount() {
    fetch("/bymake.json")
        .then((res) => res.json())
        .then((json) => this.setState({ makeModelYear: json }));
  }

  getMakeOptions() {
    return Object.keys(this.state.makeModelYear).map((k) =>
      <option>{k}</option>);
  }

  getModelOptions() {
    return Object.keys(this.state.makeModelYear).map((k) =>
      <option>{k}</option>);
  }

  getYearOptions() {
    return Object.keys(this.state.makeModelYear).map((k) =>
      <option>{k}</option>);
  }

  render() {
    return (
      <div className="App">
        <select>
          {this.getMakeOptions()}
        </select>

        <select>
          {this.getModelOptions()}
        </select>

        <select>
          {this.getYearOptions()}
        </select>
      </div>
    );
  }
}

export default App2;
