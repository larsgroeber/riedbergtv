import * as React from 'react';
import './Map.css';
import { Config } from 'src/config';

interface State {
  showWarning: boolean;
}

export class Map extends React.Component {
  state: State = { showWarning: false };
  iframe: HTMLIFrameElement | null;

  componentDidMount() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      this.setState({ showWarning: true });
    } else {
      if (this.iframe) {
        // window.addEventListener('message', (event: MessageEvent) => {
        //   if (event.origin === Config.mapUrl) {
        //     const id = event.data.id;
        //     alert(id);
        //   }
        // });
      }
    }
  }

  render() {
    return (
      <>
        <div className="alert alert-info">
          🚧Die Interaktive Karte ist noch nicht vollständig funktionsfähig,
          komme demnächst wieder! 🚧
          <br />
        </div>
        <div id="interactive-map-container">
          <iframe
            title="Interaktive Karte"
            id="interactive-map"
            ref={el => (this.iframe = el)}
            src={Config.mapUrl}
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
      </>
    );
  }
}
