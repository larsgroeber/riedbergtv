import * as React from 'react';
import { Notification } from 'src/models/notification';
import ReactMarkdown from 'react-markdown';
import './NotificationView.css';

interface Props {
  notification: Notification;
}

export class NotificationView extends React.Component<Props> {
  render() {
    return (
      <div className="alert alert-info m-0" role="alert">
        <ReactMarkdown source={this.props.notification.content} />
      </div>
    );
  }
}
