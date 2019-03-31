import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearMakeModel: {},
      yearSelected: "",
    };
  }

  componentDidMount() {
    fetch("/byYear.json")
        .then((res) => res.json())
        .then((json) => (this.setState({ yearMakeModel: json })));
  }

  getYearOptions() {
    return Object.keys(this.state.yearMakeModel).map((k) =>
      <option key={k} value={k}>{k}</option>
    );
  }

  handleYearSelect(evt) {
    this.setState({
      yearSelected: evt.target.value,
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

          <select disabled={!this.state.yearSelected}>
            <option>Make</option>
          </select>

          <select disabled={!this.state.yearSelected}>
            <option>Model</option>
          </select>
        </div>
      </div>
    );
  }
}

export default App;
