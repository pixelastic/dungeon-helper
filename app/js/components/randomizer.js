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


  getContent(text) {
    // Get possible image
    let image = null;
    let regex = /<!-- (.*) -->(.*)/;
    if (text.match(regex)) {
      let matches = regex.exec(text);
      image = matches[1];
      text = matches[2];
    }

    // Convert multi-line text into multiple <p>
    let split = text.split('\n\n');
    text = _.map(split, (p) => {
      return `<p>${p}</p>`;
    }).join('\n');

    // Get type
    let type = split.length > 1 ? 'text' : 'item';

    return {text, image, type};
  }

  // Increment the current pointer when clicking on the element
  handleClick() {
    let maxItems = this.props.items.length;
    let nextIndex = this.state.index + 1;
    if (nextIndex >= maxItems) {
      nextIndex = 0;
    }
    this.setState({
      index: nextIndex
    });
  }


  render() {
    let title = this.props.name;
    let item = this.props.items[this.state.index];
    let content = this.getContent(item);
    let classNames = {
      root: cx(
        `c-randomizer`,
        this.props.isCard ? 'c-randomizer__card' : null,
        this.props.classNames,
        'pointer',
        'br-ns bb b--gray',
        'pa3',
        'flex-auto w-100 w-50-l'
      ),
      title: cx(
        'c-randomizer--title',
        'f2',
        'mv0'
      ),
      text: cx(
        'c-randomizer--text',
        'mv0',
        'lh-copy f3 f4-l tj'
      )
    };

    let styles = {
      root: {
        backgroundImage: content.image ? `url(${content.image})` : null
      }
    };
    return (
      <div
        className={classNames.root}
        onClick={this.handleClick}
        style={styles.root}
      >
        <h3 className={classNames.title}>{title}</h3>
        <div
          className={classNames.text}
          dangerouslySetInnerHTML={{__html: content.text}}
        ></div>
      </div>
    );
  }
}

Randomizer.propTypes = {
  classNames: React.PropTypes.string,
  isCard: React.PropTypes.bool,
  items: React.PropTypes.array,
  name: React.PropTypes.string
};
