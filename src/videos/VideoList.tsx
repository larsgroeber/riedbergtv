import * as React from 'react';
import { Video } from 'src/models/video';
import { API } from 'src/services/api';
import { Category } from 'src/models/category';
import { CategoryList } from './CategoryList';
import { VideoItem } from './VideoItem';
import { Loader } from 'src/loader/Loader';
import { debounce } from 'src/functions';
import { Config } from 'src/config';

interface State {
  videos: Video[];
  categories: Category[];
  showCategories: boolean;
  loadingCategories: boolean;
  loadingSearch: boolean;
}

export class VideoList extends React.Component<{}, State> {
  state: State = {
    videos: [],
    categories: [],
    showCategories: true,
    loadingCategories: true,
    loadingSearch: false,
  };

  private searchValue: string;

  componentDidMount() {
    API.getCategories().then(categories =>
      this.setState({ categories, loadingCategories: false }),
    );
  }

  render() {
    const categories = (
      <Loader loading={this.state.loadingCategories}>
        <div>
          <CategoryList categories={this.state.categories} />
        </div>
      </Loader>
    );
    const videos = (
      <Loader loading={this.state.loadingSearch}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
          }}
        >
          {this.state.videos.map(v => (
            <div
              key={v.title}
              style={{
                margin: '0.2rem 0',
              }}
            >
              <VideoItem video={v} />
            </div>
          ))}
        </div>
      </Loader>
    );
    return (
      <>
        <div className="form-group">
          <label htmlFor="video-search" hidden>
            Nach Videos suchen
          </label>
          <input
            id="video-search"
            type="text"
            className="form-control"
            placeholder="Nach Videos suchen"
            onKeyUp={this.onSearchInput.bind(this)}
          />
        </div>
        {this.state.showCategories ? categories : videos}
      </>
    );
  }

  private onSearchInput(event: KeyboardEvent) {
    this.searchValue = (event.currentTarget as HTMLInputElement).value;
    this.onSearch();
  }

  private onSearch = debounce(() => this._onSearch(), 300);

  private _onSearch() {
    const value = this.searchValue;
    if (!value) {
      this.setState({ showCategories: true });
      return;
    }
    this.setState({ loadingSearch: true, showCategories: false });
    API.findVideos({
      title_contains: value,
      _limit: 10,
    }).then(videos => {
      this.setState({ videos, loadingSearch: false });
    });
  }
}
