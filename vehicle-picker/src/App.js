import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearMakeModel: {},
      yearSelected: "",
      makeSelected: "",
      modelSelected: "",
    };
  }

  componentDidMount() {
    fetch("/byyear.json")
        .then((res) => res.json())
        .then((json) => this.setState({ yearMakeModel: json }));
  }

  getYearOptions() {
    return Object.keys(this.state.yearMakeModel).map((k) =>
      <option key={k} value={k}>{k}</option>
    );
  }

  getMakeOptions() {
    if (this.state.yearSelected) {
      const yearData = this.state.yearMakeModel[this.state.yearSelected];
      return Object.keys(yearData).map(
          (k) => <option key={k} value={k}>{k}</option>);
    }
    return [];
  }

  getModelOptions() {
    if (this.state.makeSelected) {
      const makeData = this.state.yearMakeModel[this.state.makeSelected];
      return Object.keys(makeData).map(
          (k) => <option key={k} value={k}>{k}</option>);
    }
    return [];
  }

  handleYearSelect(evt) {
    this.setState({
      yearSelected: evt.target.value,
    });
  }
  handleMakeSelect(evt) {
    this.setState({
      makeSelected: evt.target.value,
    });
  }
  handleModelSelect(evt) {
    this.setState({
      modelSelected: evt.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <select onChange={this.handleYearSelect.bind(this)}>
            <option value="">Year</option>
            {this.getYearOptions()}
          </select>


          <select
            disabled={!this.state.yearSelected}
            onChange={this.handleMakeSelect.bind(this)}>
            <option>Make</option>
            {this.getMakeOptions()}
          </select>

          <select
            disabled={!this.state.yearSelected}
            onChange={this.handleModelSelect.bind(this)}
          >
            <option>Model</option>
            {this.getModelOptions()}
          </select>
        </div>
      </div>
    );
  }
}

export default App;
