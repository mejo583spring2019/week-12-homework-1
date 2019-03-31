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
    fetch("/byYear.json")
        .then((res) => res.json())
        .then((json) => (this.setState({ yearMakeModel: json })));
  }

  getYearOptions() {
    return Object.keys(this.state.yearMakeModel).map((k) =>
      <option>{k}</option>
    );
  }

  render() {
    return (
      <div className="App">
        <div>
          <select >
            {this.getYearOptions()}
          </select>

          <select >
            <option>World</option>
          </select>

          <select >
            <option>!</option>
          </select>
        </div>
      </div>
    );
  }
}

export default App;
