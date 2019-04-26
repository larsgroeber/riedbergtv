import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import { Category } from 'src/models/category';
import { VideoItem } from './VideoItem';

import './CategoryView.css';
import { Config } from 'src/config';
import * as moment from 'moment';

interface Props {
  category: Category;
}

const customArrowStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: '7px',
  display: 'block',
  width: '35px',
  backgroundColor: Config.theme.primary,
  cursor: 'pointer',
};

const CustomRightArrow = (props: any) => {
  const { onClick, currentSlide, slideCount } = props;
  const disabled = currentSlide + 1 === slideCount;
  return (
    <div
      style={{
        ...customArrowStyle,
        right: '-40px',
      }}
      className="category-arrow right"
      onClick={onClick}
    >
      <i
        style={{
          color: disabled ? 'gray' : Config.theme.secondary,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
        }}
        className="fas fa-angle-right"
      />
    </div>
  );
};

const CustomLeftArrow = (props: any) => {
  const { onClick, currentSlide, slideCount } = props;
  const disabled = currentSlide === 0;
  return (
    <div
      style={{
        ...customArrowStyle,
        left: '-40px',
      }}
      className="category-arrow left"
      onClick={onClick}
    >
      <i
        style={{
          color: disabled ? 'gray' : Config.theme.secondary,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
        }}
        className="fas fa-angle-left"
      />
    </div>
  );
};

interface State {
  updatedSliderSettings: boolean;
}

export class CategoryView extends React.Component<Props> {
  state: State = { updatedSliderSettings: false };
  sliderSettings: Settings = {
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    lazyLoad: 'ondemand',
    infinite: false,
    nextArrow: <CustomRightArrow />,
    prevArrow: <CustomLeftArrow />,
  };

  container = React.createRef<HTMLDivElement>();

  componentDidMount() {
    window.addEventListener('resize', () => this.forceUpdate());
    this.forceUpdate();
  }

  render() {
    this.updateSliderSettings();

    const slider = this.container.current ? (
      <Slider {...this.sliderSettings}>
        {this.filterVideos(this.props.category).videos.map(video => (
          <div
            key={video.title}
            style={{
              padding: ' 0 0.5rem',
            }}
          >
            <VideoItem video={video} />
          </div>
        ))}
      </Slider>
    ) : (
      ''
    );

    return (
      <div style={{ marginTop: '2rem' }} ref={this.container}>
        <h3
          style={{
            textAlign: 'left',
            paddingBottom: '0.7rem',
            borderBottom: '1px solid',
          }}
        >
          {this.props.category.name}
        </h3>
        <div
          className="category-view-container"
          style={{
            padding: '0 40px',
          }}
        >
          {slider}
        </div>
      </div>
    );
  }
  updateSliderSettings(): void {
    const videoCount = this.props.category.videos.length;

    let upperLimit = 5;

    if (this.container.current) {
      const width = this.container.current.offsetWidth;
      upperLimit = Math.min(Math.ceil(width / 450), upperLimit);
    }

    this.sliderSettings.slidesToShow = upperLimit;
    this.sliderSettings.slidesToScroll = upperLimit;
  }

  private filterVideos(c: Category): Category {
    return {
      ...c,
      videos: c.videos.filter(v => v.public && moment(v.publicised) < moment()),
    };
  }
}
