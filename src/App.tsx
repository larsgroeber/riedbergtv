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
import { Map } from './map/Map';
import { Header } from './header/Header';

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
    textName: 'contact-info',
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
        <Header />

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
