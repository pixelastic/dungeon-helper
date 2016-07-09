import React from 'react';
import _ from 'lodash';
import Randomizer from './randomizer';

class App extends React.Component {
  render() {
    let randomizers = _.map(this.props.randomizers, (randomizer) => {
      let key = randomizer.name;
      return (
        <Randomizer
          items={randomizer.items}
          key={key}
          name={randomizer.name}
        />
      );
    });
    return (
      <div>
        {randomizers}
      </div>
    );
  }
}

App.propTypes = {
  randomizers: React.PropTypes.array
};

export default App;
