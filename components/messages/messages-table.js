import React from 'react';

import { ListItem, ListItemText, ListItemSecondaryText, ListItemGraphic } from 'rmwc/List';

import copyToClipboard from '../../utilities/copy-to-clipboard';

import InfiniteScrollList from '../list/infinite-scroll-list';
import AccountIcon from '../user/account-icon';
import FromNow from '../dates/from-now';
import Thumbnail from '../images/thumbnail';

import './messages.css';

export default ({ finished, messages, next, scrollTargetIndex }) => {
  return (
    <div className="table">
      <InfiniteScrollList
        autoScroll
        inverseScroll
        isFinished={finished}
        name="messages-table"
        next={next}
        scrollTargetIndex={scrollTargetIndex}
      >
        {messages.map(message => (
          <MessageListItem key={message.__id} message={message} />
        ))}
      </InfiniteScrollList>
    </div>
  );
};

class MessageListItem extends React.Component {
  constructor() {
    super();

    this.primaryText = React.createRef();
  }
  handleClick() {
    const { message } = this.props;

    if (message.text) {
      copyToClipboard(message.text || message.url);
    } else if (this.primaryText) {
      this.primaryText.current.querySelector('.thumbnail').click();
    }
  }

  render() {
    const { message } = this.props;
    const isTextMessage = !!message.text;

    return (
      <ListItem
        className={isTextMessage ? 'text-message' : 'image-message'}
        onClick={this.handleClick.bind(this)}
      >
        <ListItemGraphic>
          <AccountIcon currentUser={message} />
        </ListItemGraphic>
        <ListItemText>
          <span className="primary-text" ref={this.primaryText}>
            {message.text || <Thumbnail src={message.url} height="75px" />}
          </span>
          <span className="secondary-text">
            <ListItemSecondaryText>
              {/* <span>{message.displayName}</span> */}
              <FromNow datetime={message.created} />
            </ListItemSecondaryText>
          </span>
        </ListItemText>
      </ListItem>
    );
  }
}
