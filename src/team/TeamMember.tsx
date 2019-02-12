import * as React from 'react';
import { TeamMember } from 'src/models/member';
import { Card } from 'src/card/Card';
import { Config } from 'src/config';

import * as moment from 'moment';
import 'moment/locale/de';

interface Props {
  member: TeamMember;
}

export class TeamMemberComp extends React.Component<Props> {
  render() {
    const title = <h3>{this.props.member.name}</h3>;
    const picUrl = this.props.member.picture
      ? Config.apiBase + this.props.member.picture.url
      : '/assets/profile.jpeg';
    const picture = (
      <img
        src={picUrl}
        alt="Profil"
        style={{
          borderRadius: '100%',
          margin: ' 10px auto',
          width: '80%',
        }}
      />
    );
    const description = (
      <div className="text-left pl-1 pl-sm-3 overflow-hidden">
        <div>
          <i className="fas fa-play-circle" />{' '}
          {moment(this.props.member.startedAt).format('MM.YYYY')}
        </div>
        <div className="overflow-hidden text-truncate">
          <i className="fas fa-at" />{' '}
          <a href={'mailto:' + this.props.member.email}>
            {this.props.member.email}
          </a>
        </div>
      </div>
    );
    return <Card title={title} body={description} picture={picture} />;
  }
}
