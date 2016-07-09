import React from 'react';

export default class Randomizer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      index: 0
    };
  }

  // Increment the current pointer when clicking on the element
  handleClick() {
    this.setState({
      index: this.state.index + 1
    });
  }

  render() {
    let value = this.props.items[this.state.index];
    let title = this.props.name;
    return (
      <div
        onClick={this.handleClick}
      >
        <strong>{title}</strong>
        <pre>{value}</pre>
      </div>
    );
  }
}

Randomizer.propTypes = {
  items: React.PropTypes.array,
  name: React.PropTypes.string
};
