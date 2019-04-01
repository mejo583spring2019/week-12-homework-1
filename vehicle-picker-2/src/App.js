import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: "",
      idYearMakeModel: {},
    };
  }


  componentDidMount() {
    fetch("/byid.json")
        .then((res) => res.json())
        .then((json) => this.setState({ idYearMakeModel: json}));
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const data = this.state;
    const inputStr = data.inputName;
    const inputNum = parseInt(inputStr);
    const test = this.state.idYearMakeModel[this.state.inputName];
    // const test = this.state.idYearMakeModel[this.state.inputName][1957].BMW;
    // when 12 is entered, the year is 1957 and make is BMW. I can't figure out how to create a function to access this naturally
    console.log(inputNum);
    console.log(test);
  }

  handleInputChange = (evt) => {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const {inputName} = this.state;
    return (
      <div className="App">
        <h1> enter a number between 1 and 7268</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="inputName" value={inputName} onChange={this.handleInputChange}></input>
          <input type="submit" value="submit"></input>
        </form>
        <div>
          The ID you entered corresponds to
        </div>
      </div>
    );
  }
}


export default App;
