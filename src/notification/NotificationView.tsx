import * as React from 'react';
import { Notification } from 'src/models/notification';

interface Props {
  notification: Notification;
}

export class NotificationView extends React.Component<Props> {
  componentWillReceiveProps() {
    console.log(this.props.notification);
  }
  render() {
    return <></>;
  }
}
