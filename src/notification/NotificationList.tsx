import * as React from 'react';
import { Notification, NotificationType } from 'src/models/notification';
import { toast, ToastType } from 'react-toastify';
import { NotificationView } from './NotificationView';
import { Section } from 'src/section/Section';
import { Config } from 'src/config';
import * as moment from 'moment';

interface Props {
  notifications: Notification[];
}

interface State {
  alerts: Notification[];
}

export class NotificationList extends React.Component<Props, State> {
  public state = { alerts: [] as Notification[] };
  componentDidMount() {
    const now = moment();
    const inTime = this.props.notifications.filter(
      n => now > moment(n.startDate) && now < moment(n.endDate),
    );
    this.setState({
      alerts: inTime.filter(n => n.type === 'alert'),
    });

    inTime
      .filter(n => n.type === 'toast')
      .forEach(n => toast.info(n.content, { autoClose: false }));
  }
  render() {
    if (this.state.alerts.length === 0) {
      return <></>;
    }
    return (
      <div
        style={{
          backgroundColor: Config.theme.dark.backgroundColor,
          textAlign: 'center',
          paddingTop: '1rem',
        }}
      >
        {this.state.alerts.map((n, i) => (
          <div
            style={{
              maxWidth: '1000px',
              margin: 'auto',
              padding: '20px 0',
            }}
          >
            <NotificationView key={n.name} notification={n} />
          </div>
        ))}
      </div>
    );
  }
}
