import React from 'react';

class Randomizer extends React.Component {
  render() {
    let value = this.props.items[0];
    return (
      <div>
        <strong>{this.props.name}</strong>
        <ul>
          <li>{value}</li>
        </ul>
      </div>
    );
  }
}

Randomizer.propTypes = {
  items: React.PropTypes.array,
  name: React.PropTypes.string
};

export default Randomizer;
