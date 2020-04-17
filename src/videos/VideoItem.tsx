import * as React from "react";
import { Video } from "src/models/video";

import "./VideoItem.css";
import { Config } from "src/config";
import { withRouter, RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {
  video: Video;
}

class VideoItemClass extends React.Component<Props> {
  item = React.createRef<HTMLDivElement>();

  componentDidMount() {
    window.addEventListener("resize", () => this.setElementHeight());
    this.setElementHeight();
  }
  setElementHeight(): any {
    if (!this.item.current) {
      return;
    }
    const width = this.item.current.offsetWidth;
    const height = width / Config.videoRatio;
    this.item.current.style.height = `${height}px`;
  }

  render() {
    this.setElementHeight();
    return (
      <div
        style={{
          padding: "0 0.2rem",
        }}
      >
        <div
          ref={this.item}
          className="video-item"
          style={{
            backgroundImage: this.props.video.thumbnail
              ? `url(${Config.apiBase}${this.props.video.thumbnail.url})`
              : `url(/assets/Missing-image.png)`,
            backgroundPosition: "center",
          }}
          onClick={() =>
            this.props.history.push(`/videos/${this.props.video.id}`)
          }
        >
          <div className="video-item-info">
            <h4>{this.props.video.title}</h4>
            <p style={{ opacity: 0 }}>{this.props.video.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export const VideoItem = withRouter(VideoItemClass);
