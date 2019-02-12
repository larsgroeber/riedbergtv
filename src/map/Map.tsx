import * as React from 'react';
import './Map.css';

interface State {
  dirty: number;
}

export class Map extends React.Component {
  state: State = { dirty: 0 };

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
        <div>
          <h4>
            Leider funktioniert diese Karte aktuell nicht auf Mobilgeräten.
          </h4>
        </div>
      </div>
    );
  }
}
