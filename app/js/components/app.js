import React from 'react';
import _ from 'lodash';
import Randomizer from './randomizer';

class App extends React.Component {
  render() {
    let randomizers = _.map(this.props.randomizers, (randomizer) => {
      return (
        <Randomizer
          items={randomizer.items}
          name={randomizer.name}
        />
      );
    });
    return (
      <div>
        {randomizers[0]}
      </div>
    );
  }
}

App.propTypes = {
  randomizers: React.PropTypes.array
};

export default App;
