import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearMakeModel: {},
    };
  }
  componentDidMount() {
    fetch("/byyear.json")
        .then((res) => res.json())
        .then((json) => this.setState({ yearMakeModel: json }));
  }

  getYearOptions() {
    return Object.keys(this.state.yearMakeModel).map(
        (k) => <option>{k}</option>
    );
    // we use map since it's going to return something (forEach doesn't)
  }
  handleYearSelect(evt) {
    console.log("year selection changed", evt);
  }
  render() {
    return (
      <div className="App">
        <div>
          <select onChange={this.handleYearSelect.bind(this)}>
            {this.getYearOptions()}
          </select>
          <select>
            <option>World</option>
          </select>
          <select>
            <option>!</option>
          </select>

        </div>
      </div>
    );
  }
}

export default App;
