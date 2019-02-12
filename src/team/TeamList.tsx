import * as React from 'react';
import { TeamMember } from 'src/models/member';
import { API } from 'src/services/api';
import { TeamMemberComp } from './TeamMember';
import './TeamList.css';

interface State {
  members: TeamMember[];
  show: number;
}

export class TeamList extends React.Component {
  private defaultShow = 4;
  state: State = { members: [], show: this.defaultShow };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    API.getTeamMembers().then(members => this.setState({ members }));
  }

  toggleShowAll() {
    let show;
    if (this.state.show === this.defaultShow) {
      show = this.state.members.length;
    } else {
      show = this.defaultShow;
    }
    this.setState({ show });
  }

  get showAll() {
    return this.state.show >= this.state.members.length;
  }

  render() {
    return (
      <>
        <div className="team-list">
          {this.state.members.slice(0, this.state.show).map(member => (
            <div key={member.id} className="team-member">
              <TeamMemberComp member={member}>{member.name}</TeamMemberComp>
            </div>
          ))}
        </div>
        <button
          className={
            'btn btn-outline-dark mt-3' + (this.showAll ? ' d-none' : '')
          }
          onClick={() => this.toggleShowAll()}
        >
          Zeige alle
        </button>
      </>
    );
  }
}
