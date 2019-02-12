import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Page } from 'src/models/page';
import { Navbar } from 'src/navbar/Navbar';
import { API } from 'src/services/api';
import { Config } from 'src/config';
import { Loader } from 'src/loader/Loader';
import { Section } from 'src/section/Section';
import { Footer } from 'src/footer/Footer';

interface Props {
  match: { params: { slug: string } };
}

interface State {
  page?: Page;
  loading: boolean;
}

export class PageView extends React.Component<Props> {
  state: State = { loading: true };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (
      !this.state.loading &&
      this.state.page &&
      this.state.page.slug !== this.props.match.params.slug
    ) {
      this.setState({ loading: true });
      this.fetchData();
    }
  }

  private fetchData() {
    API.findPages({
      slug: this.props.match.params.slug,
    }).then(page => this.setState({ page: page[0], loading: false }));
  }

  render() {
    const backgroundImage =
      this.state.page && this.state.page.header
        ? `url(${Config.apiBase}${this.state.page.header.url})`
        : '';
    return (
      <div>
        <Navbar />
        <div
          style={{
            height: '40vh',
            backgroundImage,
            backgroundColor: '#66cccc',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <h1
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
            }}
          >
            {this.state.page ? this.state.page.title : ''}
          </h1>
        </div>
        <Loader loading={this.state.loading}>
          <div
            style={{
              maxWidth: '1000px',
              margin: 'auto',
              padding: '2rem 1rem',
            }}
          >
            <ReactMarkdown
              source={this.state.page ? this.state.page.content : ''}
            />
          </div>
        </Loader>
        <Section>
          <Footer />
        </Section>
      </div>
    );
  }
}
