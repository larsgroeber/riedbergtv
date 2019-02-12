import * as React from 'react';
import './Map.css';

interface State {
  showWarning: boolean;
}

export class Map extends React.Component {
  state: State = { showWarning: false };

  componentDidMount() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      this.setState({ showWarning: true });
    }
  }

  render() {
    return (
      <div id="interactive-map">
        <iframe
          title="Interaktive Karte"
          id="interactive-map"
          src="https://riedberg.tv/interactive_map/dist/"
          style={{
            width: '100%',
            height: '500px',
            border: 'none',
          }}
        />
        <div className={this.state.showWarning ? '' : 'd-none'}>
          <h4>
            Leider funktioniert diese Karte aktuell nicht auf Mobilgeräten.
          </h4>
        </div>
      </div>
    );
  }
}
