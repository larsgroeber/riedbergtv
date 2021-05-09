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
  private defaultShow = 6;
  state: State = { members: [], show: this.defaultShow };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    API.getTeamMembers()
      .then(this.sortMembers)
      .then(members => this.setState({ members }));
  }

  sortMembers(members: TeamMember[]) {
    return new Promise((res, rej) => {
      const m = members
        .filter(m => !!m.startedAt)
        .map(m => ({
          ...m,
          startedAt: new Date(m.startedAt),
          leftAt: m.leftAt ? new Date(m.leftAt) : null,
        }));
      const result = [
        ...m
          .filter(m => !m.leftAt && m.active)
          .sort((m1, m2) => m1.startedAt.getTime() - m2.startedAt.getTime()),

        ...m
          .filter(m => m.leftAt)
          .sort((m1, m2) => m1.leftAt!.getTime() - m2.leftAt!.getTime()),
      ];
      res(result);
    });
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
