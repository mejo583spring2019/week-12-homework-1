import React, { Component } from "react";
import "./App.css";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeYearModel: {},
      yearSelected: "",
      makeSelected: "",
      modelSelected: "",
      modelName: "",
      yearsOperated: "",
    };
  }

  componentDidMount() {
    fetch("/byMake.json")
        .then((res) => res.json())
        .then((json) => (this.setState({ makeYearModel: json })));
  }

  getMakeOptions() {
    return Object.keys(this.state.makeYearModel).map((k) =>
      <option key={k} value={k}>{k}</option>
    );
  }

  getYearOptions() {
    if (this.state.makeSelected) {
      const make = this.state.makeSelected;
      const makeData = this.state.makeYearModel[make];
      return Object.keys(makeData).map((k) =>
        <option key={k + make} value={k}>{k}</option>
      );
    }
    return [];
  }

  getModelOptions() {
    if (this.state.yearSelected !== "" && this.state.makeSelected !== "") {
      const year = this.state.yearSelected;
      const make = this.state.makeSelected;
      const makeData = this.state.makeYearModel[make];
      const yearData = makeData[year];
      return Object.keys(yearData).map(
          (k) => <option key={yearData[k]} value={yearData[k]}>{k}</option>
      );
    }
    return [];
  }

  getYearLength() {
    if (this.state.makeSelected) {
      const make = this.state.makeSelected;
      const makeLength = this.state.makeYearModel[make];
      const years = Object.keys(makeLength);
      const firstYear = years[0];
      const currYear = 2019;
      const yearDifference = currYear - firstYear;
      return yearDifference;
    }

    return "";
  }

  handleMakeSelect(evt) {
    this.setState({
      yearSelected: "",
      makeSelected: evt.target.value,
      modelSelected: "",
      modelName: "",
    });
  }

  handleYearSelect(evt) {
    this.setState({
      yearSelected: evt.target.value,
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

  handleYearLength(evt) {
    this.setState({
      yearsOperated: evt.target.value,
    });
  }


  render() {
    return (
      <div className="App__section2">
        <h2>In the beginning, there were only a few car manufacturers.
          Today, there are hundreds. Choose a manufacturer:&nbsp;
        <select onChange={this.handleMakeSelect.bind(this)}>
          <option value="">Make</option>
          {this.getMakeOptions()}
        </select> &nbsp; to see how long they have been
              in business and what types of cars they offer.
        </h2>
        <h3>{this.state.makeSelected} has been around for
        &nbsp;<span
            value="{this.yearsOperated}"
            onChange="{this.handleYearLength.bind(this)}"
          >
            {this.getYearLength()}</span>&nbsp; years.
        </h3>

        <select
          disabled={!this.state.makeSelected}
          onChange={this.handleYearSelect.bind(this)}
        >
          <option value="">Year</option>
          {this.getYearOptions()}
        </select>

        <select
          disabled={!this.state.yearSelected || !this.state.makeSelected}
          onChange={this.handleModelSelect.bind(this)}
        >
          <option value="">Model</option>
          {this.getModelOptions()}
        </select>
        <p>Reason for doing a selector this way: When I created my second tree,
          I grouped it from Make, Year, and Model.
          So, when you play this "Mad Libs", you'll have some information that
          dynamically gets loaded into it
          (such as # of years, # of models, etc)
        </p>
      </div>
    );
  }
}

export default Car;
