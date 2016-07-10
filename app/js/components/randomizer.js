import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

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

  // Convert multiline text to HTML enclosed in <p>
  text2HTML(text) {
    let split = text.split('\n\n');
    return _.map(split, (p) => {
      return `<p>${p}</p>`;
    }).join('\n');
  }

  render() {
    let value = this.text2HTML(this.props.items[this.state.index]);
    let title = this.props.name;
    let classNames = {
      root: cx(
        'c-randomizer',
        `${this.props.color} hover-bg-${this.props.color} hover-black`,
        'pointer',
        'br-ns bb b--gray',
        'pa3',
        'flex-auto w-100 w-33-l'
      ),
      title: cx(
        'c-randomizer--title',
        'f3',
        'mv0'
      ),
      text: cx(
        'c-randomizer--text',
        'mv0',
        'lh-copy measure f3 tj'
      )
    };
    return (
      <div
        className={classNames.root}
        onClick={this.handleClick}
      >
        <h3 className={classNames.title}>{title}</h3>
        <div
          className={classNames.text}
          dangerouslySetInnerHTML={{__html: value}}
        ></div>
      </div>
    );
  }
}

Randomizer.propTypes = {
  color: React.PropTypes.string,
  items: React.PropTypes.array,
  name: React.PropTypes.string
};
