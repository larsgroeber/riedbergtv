import * as React from 'react';
import { Config } from 'src/config';
import { toast } from 'react-toastify';

interface State {
  subject?: string;
  name?: string;
  email?: string;
  body?: string;
}

export class Contact extends React.Component {
  public state: State = {};
  render() {
    return (
      <div style={{ maxWidth: '1000px', margin: 'auto' }}>
        <div
          style={{
            textAlign: 'left',
          }}
        >
          <div className="form-group">
            <input
              type="text"
              id="subject"
              className="form-control"
              placeholder="Betreff"
              value={this.state.subject}
              onChange={evt => this.setState({ subject: evt.target.value })}
            />
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Dein Name"
                  value={this.state.name}
                  onChange={evt => this.setState({ name: evt.target.value })}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Deine E-Mail"
                  value={this.state.email}
                  onChange={evt => this.setState({ email: evt.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <textarea
              id="body"
              className="form-control"
              placeholder="Deine Nachricht 😀"
              value={this.state.body}
              onChange={evt => this.setState({ body: evt.target.value })}
            />
          </div>
          <button
            className="btn btn-light"
            onClick={this.send.bind(this)}
            disabled={!this.allFieldsFilled}
          >
            <i className="fas fa-envelope" /> Abschicken
          </button>
        </div>
      </div>
    );
  }

  get allFieldsFilled() {
    const { subject, name, email, body } = this.state;
    return subject && name && email && body;
  }

  send() {
    const { subject, name, email, body } = this.state;
    if (!this.allFieldsFilled) {
      toast.info('Bitte fülle alle Felder aus.');
      return;
    }
    toast.success(`Vielen Dank für deine Nachricht${name ? ', ' + name : ''}.`);
    this.setState({
      subject: '',
      email: '',
      name: '',
      body: '',
    });
  }
}
