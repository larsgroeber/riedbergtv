import * as React from 'react';
import { Config } from 'src/config';
import ReactMarkdown from 'react-markdown';

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
        className={`text-center ${this.props.className}`}
        style={{
          ...(this.props.dark ? Config.theme.dark : Config.theme.light),
          padding: '2.5rem 0.5rem',
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
        <div
          style={{
            maxWidth: '1000px',
            margin: 'auto',
          }}
        >
          <div
            className={this.props.contentClass}
            style={{
              padding: '0 1rem',
            }}
          >
            {this.props.children}
            <ReactMarkdown source={this.props.text} />
          </div>
        </div>
      </div>
    );
  }
}
