import * as React from 'react';
import { Config } from 'src/config';
import ReactMarkdown from 'react-markdown';
import './Section.css';

interface Props {
  dark?: boolean;
  title?: string;
  text?: string;
  contentClass?: string;
  headerId?: string;
  className?: string;
}

export class Section extends React.Component<Props> {
  public render() {
    return (
      <div
        className={`text-center section-wrapper ${this.props.className}`}
        style={{
          ...(this.props.dark ? Config.theme.dark : Config.theme.light),
        }}
      >
        <h2
          id={this.props.headerId}
          style={{
            marginBottom: '2.5rem',
          }}
        >
          {this.props.title}
        </h2>
        <div>
          <div className={`section-content ${this.props.contentClass}`}>
            <ReactMarkdown source={this.props.text} />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
