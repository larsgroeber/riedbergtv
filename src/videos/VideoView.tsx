import * as React from 'react';
import { Video } from 'src/models/video';
import { Loader } from '../loader/Loader';
import { API } from 'src/services/api';
import { RouterProps } from 'src/models/router-props';
import { Section } from '../section/Section';
import { Config } from 'src/config';
import { Navbar } from 'src/navbar/Navbar';
import * as moment from 'moment';
import 'moment/locale/de';
import { Footer } from 'src/footer/Footer';

interface Props extends RouterProps {}

interface State {
  video?: Video;
  loading: boolean;
}

export class VideoView extends React.Component<Props, State> {
  state: State = { loading: true };

  componentDidMount() {
    API.findVideos({
      title: this.props.match.params.slug,
    }).then(videos => {
      this.setState({ video: videos[0], loading: false });
    });
  }

  render() {
    if (!this.state.video) {
      return <Loader loading={this.state.loading} />;
    }

    moment.locale('de');

    const video = this.state.video;
    const videoView =
      video && video.video ? (
        <video
          style={{
            width: '100%',
            maxWidth: '1300px',
            margin: 'auto',
          }}
          src={`${Config.apiBase}${video.video.url}`}
          controls
        />
      ) : (
        <strong style={{ color: 'white' }}>
          There is no video file on this video!
        </strong>
      );
    return (
      <Loader loading={this.state.loading}>
        <Navbar notFloating={true} />
        <div
          style={{
            backgroundColor: Config.theme.dark.backgroundColor,
            textAlign: 'center',
            borderBottom: `5px solid ${Config.theme.primary}`,
          }}
        >
          {videoView}
        </div>
        <Section
          title={video.title}
          text={video.description}
          dark={true}
          contentClass="text-left"
        >
          <div className="text-left mb-2">
            <small>
              Dieses Video wurde {moment(video.createdAt).fromNow()}{' '}
              veröffentlicht.
            </small>
          </div>
        </Section>
        <Section>
          <Footer />
        </Section>
      </Loader>
    );
  }
}
