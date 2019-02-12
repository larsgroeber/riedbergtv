import * as React from 'react';
import './App.css';
import { Navbar } from './navbar/Navbar';
import { Section } from './section/Section';
import { VideoList } from './videos/VideoList';
import { Text } from './models/text';
import { API } from './services/api';
import { Footer } from './footer/Footer';
import { TeamList } from './team/TeamList';
import { FAQ } from './faq/FAQ';
import { Contact } from './contact/Contact';
import { Config } from './config';
import { Map } from './map/Map';

const sections = [
  {
    content: (
      <div>
        <VideoList />
      </div>
    ),
    title: 'Videos',
    headerId: 'videos',
  },
  {
    textName: 'ueber-riedbergtv',
    title: 'Über RiedbergTV',
    headerId: 'ueber',
  },
  {
    title: 'Interaktive Karte',
    headerId: 'map',
    content: <Map />,
  },
  {
    title: 'Unser Team',
    headerId: 'team',
    content: <TeamList />,
  },
  {
    title: 'FAQ',
    headerId: 'faq',
    content: <FAQ />,
  },
  {
    title: 'Kontakt',
    content: <Contact />,
    headerId: 'contact',
  },
  {
    content: <Footer />,
  },
];

interface State {
  texts: Text[];
}

class App extends React.Component {
  state: State = { texts: [] };

  componentDidMount() {
    API.getTexts().then(texts => this.setState({ texts, loading: false }));
  }

  public render() {
    return (
      <div className="App">
        {/*  */}
        <div className="video-header">
          <video
            src="/assets/SeLF-Video-RiedbergTV.small.mp4"
            autoPlay
            muted
            loop
          />
          <div className="header">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <div
                style={{
                  alignSelf: 'center',
                  margin: '0 10px',
                }}
                className="text-center"
              >
                <h1>RiedbergTV</h1>
                <p>naturwissenschaftliche Videos von Studenten für Studenten</p>
                <a href="#videos">
                  <button className="btn btn-primary d-none d-sm-inline-block">
                    Zu den Videos
                  </button>
                </a>
                <button className="btn btn-outline-primary ml-2">
                  Mach mit
                </button>
              </div>
            </div>
          </div>
        </div>

        <Navbar homePage={true} />

        {sections.map((s, i) => (
          <Section
            title={s.title}
            key={i}
            dark={i % 2 === 0}
            text={this.getContent(s.textName)}
            headerId={s.headerId}
          >
            {s.content}
          </Section>
        ))}
      </div>
    );
  }
  getContent(textName: string | undefined): any {
    if (!textName) {
      return '';
    }

    const text = this.state.texts.find(t => t.name === textName);
    return text ? text.text : '';
  }
}

export default App;
