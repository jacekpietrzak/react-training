import { Component } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";

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
    console.log(`[${event.target.innerText}] ${this.props.step}`);

    this.setState((prevState) => {
      return {
        counterValue: prevState.counterValue - this.props.step,
      };
    });
  };

  handleIncrement = (event) => {
    console.log(`[${event.target.innerText}] ${this.props.step}`);
    // console.log(this);

    this.setState((prevState) => {
      return {
        counterValue: prevState.counterValue + this.props.step,
      };
    });
  };

  handleReset = () => {
    this.setState(() => {
      return {
        counterValue: this.props.initialValue,
      };
    });
  };

  goJohny = () => {
    console.log("Go Johny, go!!");
  };

  render() {
    return (
      <>
        <h1>Counter: {this.state.counterValue}</h1>
        <button onClick={this.handleDecrement}>-</button>
        <button onClick={this.handleIncrement}>+</button>
        <button onClick={this.handleReset}>RESET</button>
        <Button label="GO!" onClickAction={this.goJohny} />
      </>
    );
  }
}

export default Counter;
