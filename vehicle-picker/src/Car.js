import React, { Component } from "react";
import "./App.css";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      makeYearModel: {},
      makeSelected: "",
      yearsOperated: "",
      yearsInJSON: "",
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

  getNoOfYearsinJSON() {
    if (this.state.makeSelected) {
      const make = this.state.makeSelected;
      const makeLength = this.state.makeYearModel[make];
      const years = Object.keys(makeLength);
      const size = years.length;
      return size;
    }
    return "";
  }

  handleMakeSelect(evt) {
    this.setState({
      makeSelected: evt.target.value,
    });
  }

  handleYearLength(evt) {
    this.setState({
      yearsOperated: evt.target.value,
    });
  }

  handleJsonYearData(evt) {
    this.setState({
      yearsInJSON: evt.target.value,
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
        </select> &nbsp; to see how long they have been in business.
        </h2>
        <h3>{this.state.makeSelected} has been around for
        &nbsp;<span
            value="{this.yearsOperated}"
            onChange="{this.handleYearLength.bind(this)}"
          >
            {this.getYearLength()}</span>&nbsp; years. We have data for&nbsp;
          <span
            onChange="{this.handleJsonYearData.bind(this)}"
          >
            {this.getNoOfYearsinJSON()}
          </span>&nbsp;years
        </h3>
        <p>Reason for doing a selector this way: When I created my second tree,
          I grouped it from Make, Year, and Model.
          So, when you pick a manufacturer, you'll have some information that
          dynamically gets loaded into it
          (such as # of years, # of models, etc)
        </p>
        <p>
          Additonally, the dataset is imcomplete.
          If we only have data for a car manufacturer
          for a small number of years,
          then it could be assumed the manufacturer is no longer in business.
        </p>
      </div>
    );
  }
}

export default Car;
