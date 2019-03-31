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
      modelName: "",
    };
  }

  componentDidMount() {
    fetch("/byyear.json")
        .then((res) => res.json())
        .then((json) => this.setState({ yearMakeModel: json }));
  }

  getYearOptions() {
    return Object.keys(this.state.yearMakeModel).map(
        (k) => <option key={k} value={k}>{k}</option>
    );
  }

  getMakeOptions() {
    if (this.state.yearSelected) {
      const year = this.state.yearSelected;
      const yearData = this.state.yearMakeModel[year];
      return Object.keys(yearData).map(
          (k) => <option key={k + year} value={k}>{k}</option>
      );
    }
    return [];
  }

  getModelOptions() {
    if (this.state.makeSelected !== "" && this.state.yearSelected !== "") {
      const year = this.state.yearSelected;
      const make = this.state.makeSelected;
      const yearData = this.state.yearMakeModel[year];
      const makeData = yearData[make];
      return Object.keys(makeData).map(
          (k) => <option key={makeData[k]} value={makeData[k]}>{k}</option>
      );
    }
    return [];
  }

  handleYearSelect(evt) {
    this.setState({
      yearSelected: evt.target.value,
      modelSelected: "",
      makeSelected: "",
      modelName: "",
    });
  }

  handleMakeSelect(evt) {
    this.setState({
      makeSelected: evt.target.value,
      modelSelected: "",
      modelName: "",
    });
  }

  handleModelSelect(evt) {
    this.setState({
      modelSelected: evt.target.value,
      modelName: evt.target[evt.target.selectedIndex].text,
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
            <option value="">Make</option>
            {this.getMakeOptions()}
          </select>

          <select
            disabled={!this.state.yearSelected || !this.state.makeSelected}
            onChange={this.handleModelSelect.bind(this)}>
            <option value="">Model</option>
            {this.getModelOptions()}
          </select>
        </div>

        <div>
          You Selected {this.state.yearSelected} &nbsp;
          {this.state.makeSelected} &nbsp;
          {this.state.modelName} &nbsp;
          that has the ID {this.state.modelSelected}
        </div>
      </div>
    );
  }
}

export default App;
