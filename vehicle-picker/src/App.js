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
    fetch("/byYear.json")
      .then((res) => res.json())
      .then((json) => this.setState({ yearMakeModel: json }));
  }

  getYearOption() {
    return Object.keys(this.state.yearMakeModel).map(
      (k) => <option key={k} value={k}>{k}</option>
    );
  }

  getMakeOption() {
    if (this.state.yearSelected) {
      const year = this.state.yearSelected;
      const yearData = this.state.yearMakeModel[year];
      return Object.keys(yearData).map(
        (k) => <option key={k + year} value={k}>{k}</option>
      );
    }
  }

  getModelOption() {
    if (this.state.makeSelected !== "" && this.state.yearSelected !== "") {
      const year = this.state.yearSelected;
      const make = this.state.makeSelected;
      const yearData = this.state.yearMakeModel[year];
      const makeData = yearData[make];
      return Object.keys(makeData).map(
        (k) => <option key={makeData[k]} value={makeData[k]}>{k}</option>
      );
    }
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
            {this.getYearOption()}
          </select>
          <select
            onChange={this.handleMakeSelect.bind(this)}
            disabled={!this.state.yearSelected}>
            <option value="">Make</option>
            {this.getMakeOption()}
          </select>
          <select
            onChange={this.handleModelSelect.bind(this)}
            disabled={!this.state.makeSelected}>
            <option value="">Model</option>
            {this.getModelOption()}
          </select>
        </div>
        <div>
          You selected {this.state.yearSelected} {this.state.makeSelected} {this.state.modelName} that has the id {this.state.modelSelected}
        </div>
      </div>
    );
  }
}

export default App;
