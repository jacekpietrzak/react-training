import { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    // console.log("Props: ", props);
    this.state = {
      counterValue: props.initialValue,
    };
  }

  static defaultProps = {
    initialValue: 0,
    step: 1,
  };

  static propTypes = {
    initialValue: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  };

  handleDecrement = (event) => {
    console.log(`[${event.target.innerText}]`);
  };

  handleIncrement = (event) => {
    console.log(`[${event.target.innerText}]`);
    // console.log(this);

    this.setState((prevState) => {
      console.log(prevState);
      return {
        counterValue: prevState.counterValue + 1,
      };
    });
  };

  render() {
    return (
      <>
        <h1>Counter: {this.state.counterValue}</h1>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleIncrement}>+</button>
      </>
    );
  }
}

export default Counter;
