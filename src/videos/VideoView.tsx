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
import { Player } from 'video-react';

interface Props extends RouterProps {}

interface State {
  video?: Video;
  categories?: Category[];
  loadingVideo: boolean;
  loadingCategories: boolean;
}

export class VideoView extends React.Component<Props, State> {
  state: State = { loadingVideo: true, loadingCategories: true };

  componentDidMount() {
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
    const video = this.state.video || ({} as any);
    const videoView =
      video && video.video ? (
        <div
          style={{
            width: '100%',
            maxWidth: '1300px',
            margin: 'auto',
          }}
        >
          <Player src={`${Config.apiBase}${video.video.url}`} controls />
        </div>
      ) : (
        <strong style={{ color: 'white' }}>
          There is no video file on this video!
        </strong>
      );

    const categoriesView = categories ? (
      <div>
        <CategoryList categories={categories} />
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
        </Section>
        <Section dark={true}>{categoriesView}</Section>
        <Section>
          <Footer />
        </Section>
      </Loader>
    );
  }
}
