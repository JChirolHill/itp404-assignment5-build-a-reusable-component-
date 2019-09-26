import React from 'react';
import PropTypes from 'prop-types';

export default class EditableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
    };
    console.log(this.props.placeholder);
  }

  handleInputChange = (event) => {
    this.setState({
      inputVal: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.inputVal !== '') {
      this.props.onSubmitInput(this.state.inputVal);
      this.setState({
        inputVal: ''
      });
    }
  }

  render() {
    if(typeof this.props.children === 'function') {
      return this.props.children(
        this.props.listItems,
        this.state.inputVal,
        this.handleInputChange,
        this.handleSubmit,
        this.props.onClick,
      );
    }
    return (
      <>
        <form onSubmit={this.handleSubmit} >
          <input
            value={this.state.inputVal}
            onChange={this.handleInputChange}
            placeholder={this.props.placeholder ? this.props.placeholder : undefined} />
        </form>

        {this.props.listItems.map((item, index) => {
          return (
            <div
              className="item"
              key={index}
              onClick={this.props.onClick ? this.props.onClick.bind(this, item) : undefined}>{item}</div>
          );
        })}
      </>
    );
  }
}

EditableList.propTypes = {
  listItems: PropTypes.array.isRequired,
  onSubmitInput: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
};
