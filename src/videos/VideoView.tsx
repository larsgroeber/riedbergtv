///<reference path="../typings/video-react.d.ts" />
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
import { Category } from 'src/models/category';
import { from, of } from 'rxjs';
import {
  take,
  switchMap,
  filter,
  map,
  tap,
  finalize,
  catchError,
} from 'rxjs/operators';
import { CategoryList } from './CategoryList';
import { toast } from 'react-toastify';
import { Player, BigPlayButton } from 'video-react';
import './VideoView.css';

interface Props extends RouterProps {}

interface State {
  video?: Video;
  categories?: Category[];
  loadingVideo: boolean;
  loadingCategories: boolean;
}

export class VideoView extends React.Component<Props, State> {
  state: State = { loadingVideo: true, loadingCategories: true };
  player: any;
  private subToPlayerSet = false;
  private setWatched = false;

  componentDidUpdate() {
    if (this.player && !this.subToPlayerSet) {
      this.player.subscribeToStateChange(
        this.handlePlayerStateChange.bind(this),
      );
      this.subToPlayerSet = true;
    }
    if (
      !this.state.loadingVideo &&
      !this.state.loadingCategories &&
      this.state.video &&
      this.state.video.title !== this.props.match.params.slug
    ) {
      this.reset();
      this.fetchData();
    }
  }

  private reset() {
    window.scrollTo({ top: 0 });
    this.setState({ loadingVideo: true, loadingCategories: true });
    this.subToPlayerSet = false;
    this.setWatched = false;
    this.player = null;
  }

  componentDidMount() {
    window.scrollTo({ top: 0 });
    this.fetchData();
  }

  private handlePlayerStateChange(e: any) {
    if (this.setWatched || !this.state.video) {
      return;
    }

    if (e.currentTime > e.duration / 4) {
      API.videoWatched(this.state.video._id);
      this.setWatched = true;
    }
  }

  private fetchData() {
    from(
      API.findVideos({
        title: this.props.match.params.slug,
      }),
    )
      .pipe(
        take(1),
        switchMap(videos => {
          const video = videos[0];
          this.setState({ video, loadingVideo: false });
          if (video) {
            return from(
              API.findCategory({
                name: video.categories.map(c => c.name)[0],
              }),
            );
          }
          return of(null);
        }),
        filter(v => !!v),
        tap((categories: Category[]) =>
          this.setState({ categories, loadingCategories: false }),
        ),

        catchError(() => {
          toast.error(
            'There was an error when loading the video or the categories.',
            {
              autoClose: false,
            },
          );
          return of();
        }),
        finalize(() =>
          this.setState({ loadingCategories: false, loadingVideo: false }),
        ),
      )
      .subscribe();
  }

  render() {
    moment.locale('de');

    const { categories } = this.state;
    const video: Video = this.state.video || ({} as any);
    let videoUrl = '';
    if (video.video) {
      videoUrl = `${Config.customBackend}${video.video.url}`;
    } else if (video.videoSmall) {
      videoUrl = `${Config.customBackend}${video.videoSmall.url}`;
    }
    const thumbnailFile = `${Config.customBackend}${
      (video.thumbnail || {}).url
    }`;
    const videoView = videoUrl ? (
      <div
        style={{
          width: '100%',
          maxWidth: '1300px',
          margin: 'auto',
        }}
      >
        <Player
          src={videoUrl}
          poster={thumbnailFile}
          controls
          ref={(el: any) => (this.player = el)}
        >
          <BigPlayButton position="center" />
        </Player>
      </div>
    ) : (
      <strong style={{ color: 'white' }}>
        There is no video file on this video!
      </strong>
    );

    const categoriesView = categories ? (
      <div>
        <CategoryList
          categories={categories.map(category => {
            const index = category.videos.findIndex(
              v => v._id === this.state.video!._id,
            );
            if (index > -1) {
              category.videos.splice(index, 1);
            }
            return category;
          })}
        />
      </div>
    ) : (
      ''
    );

    const categoriesOfThisVideoView = categories
      ? categories.map(c => (
          <span
            key={c.name}
            className="category-name"
            style={{
              color: Config.theme.primary,
              textTransform: 'uppercase',
              border: `2px solid ${Config.theme.primary}`,
              borderRadius: '5px',
              padding: '5px',
            }}
          >
            {c.name}
          </span>
        ))
      : '';

    const privateAlert =
      video && !video.public ? (
        <div className="alert alert-danger">
          Dieses Video ist nicht öffentlich und nur über den Link verfügbar.
        </div>
      ) : (
        ''
      );
    return (
      <Loader loading={this.state.loadingVideo}>
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
          {privateAlert}
          <div className="mt-4">{categoriesOfThisVideoView}</div>
        </Section>
        <Section dark={true}>{categoriesView}</Section>
        <Section>
          <Footer />
        </Section>
      </Loader>
    );
  }
}
