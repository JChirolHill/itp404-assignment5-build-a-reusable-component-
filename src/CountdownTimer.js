import React from 'react';
import PropTypes from 'prop-types';

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      running: this.props.start,
      time: this.props.totalTime,
      secondsLeft: this.props.totalTime,
    }
  }

  countDown = () => { // count down one second
    this.setState({
      secondsLeft: this.state.secondsLeft - 1,
      running: true,
    });
    if(this.state.secondsLeft <= 0) { // when finish
      clearInterval(this.timer);
      if(this.props.onFinish) {
        this.props.onFinish();
      }
    }
  }

  componentDidMount() {
    // initiates timer
    console.log('yo');
    console.log(this.props.start);
    if(this.state.running) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  render() {
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
