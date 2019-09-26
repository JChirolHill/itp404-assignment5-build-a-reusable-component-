import React from 'react';
import PropTypes from 'prop-types';

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      running: false,
      time: this.props.totalTime,
      secondsLeft: this.props.totalTime,
    }
  }

  countDown = () => { // count down one second
    this.setState({
      secondsLeft: this.state.secondsLeft - 1,
      running: true,
    });
    if(this.state.secondsLeft === 0) { // when finish
      clearInterval(this.timer);
      if(this.props.onFinish) {
        this.props.onFinish();
      }
    }
  }

  render() {
    // initiates timer
    if(this.props.start && this.state.running === false) {
      this.timer = setInterval(this.countDown, 1000);
    }

    if(typeof this.props.children === 'function') {
      return this.props.children(
        this.state.secondsLeft
      );
    }
    return (
      <>
        {this.state.secondsLeft} Seconds Left
      </>
    );
  }
}

CountdownTimer.propTypes = {
    totalTime: PropTypes.number.isRequired,
    start: PropTypes.bool.isRequired,
    onFinish: PropTypes.func,
}
