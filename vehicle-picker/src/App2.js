import React, { Component } from "react";
import "./App.css";

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeModelYear: {},
      makeSelected: "",
      modelSelected: "",
      yearSelected: "",
      modelIndex: "",
    };
  }

  componentDidMount() {
    fetch("/bymake.json")
        .then((res) => res.json())
        .then((json) => this.setState({ makeModelYear: json }));
  }

  getMakeOptions() {
    return Object.keys(this.state.makeModelYear).map((k) =>
      <option key={k} value={k}>{k}</option>);
  }

  getModelOptions() {
    if (this.state.makeSelected) {
      const make = this.state.makeSelected;
      const makeData = this.state.makeModelYear[make];
      return Object.keys(makeData).map((k) =>
        <option key={k + make} value={k}>{k}</option>);
    }
    return [];
  }

  getYearOptions() {
    if (this.state.modelSelected !== "" && this.state.makeSelected !== "") {
      const make = this.state.makeSelected;
      const model = this.state.modelSelected;
      const makeData = this.state.makeModelYear[make];
      const modelData = makeData[model];
      return Object.keys(modelData).map((k) =>
        <option key={modelData[k]} value={modelData[k]}>{k}</option>);
    }
    return [];
  }

  handleMakeSelect(evt) {
    this.setState({
      makeSelected: evt.target.value,
      modelSelected: "",
      yearSelected: "",
      modelIndex: "",
    });
  }

  handleModelSelect(evt) {
    this.setState({
      modelSelected: evt.target.value,
      yearSelected: "",
      modelIndex: "",
    });
  }

  handleYearSelect(evt) {
    this.setState({
      yearSelected: evt.target[evt.target.selectedIndex].text,
      modelIndex: evt.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <select onChange={this.handleMakeSelect.bind(this)}>
            <option value="">Make</option>
            {this.getMakeOptions()}
          </select>

          <select onChange={this.handleModelSelect.bind(this)}
            disabled={!this.state.makeSelected}>
            <option value="">Model</option>
            {this.getModelOptions()}
          </select>

          <select onChange={this.handleYearSelect.bind(this)}
            disabled={!this.state.makeSelected || !this.state.modelSelected}>
            <option value="">Year</option>
            {this.getYearOptions()}
          </select>
        </div>

        <div>
          You Selected
          a {this.state.makeSelected} {this.state.modelSelected} from
          the year {this.state.yearSelected} that
          has an index: {this.state.modelIndex}.

        </div>
      </div>
    );
  }
}

export default App2;
