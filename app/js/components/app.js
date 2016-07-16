import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import Randomizer from './randomizer';

class App extends React.Component {
  render() {
    let classNames = cx(
      'bg-black gray',
      'flex flex-row flex-wrap'
    );
    let randomizers = _.map(this.props.randomizers, (randomizer) => {
      let key = randomizer.name;
      return (
        <Randomizer
          {...randomizer}
          key={key}
        />
      );
    });
    return (
      <div className={classNames}>
        {randomizers}
      </div>
    );
  }
}

App.propTypes = {
  randomizers: React.PropTypes.array
};

export default App;
