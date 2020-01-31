import * as React from "react";
import ReactMarkdown from "react-markdown";
import { Page } from "src/models/page";
import { Navbar } from "src/navbar/Navbar";
import { API } from "src/services/api";
import { Config } from "src/config";
import { Loader } from "src/loader/Loader";
import { Section } from "src/section/Section";
import { Footer } from "src/footer/Footer";
import { isHTML } from "src/functions";
import "./PageView.css";

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
    window.scrollTo({ top: 0 });
    this.fetchData();
  }

  componentDidUpdate() {
    if (
      !this.state.loading &&
      this.state.page &&
      this.state.page.slug !== this.props.match.params.slug
    ) {
      window.scrollTo({ top: 0 });
      this.setState({ loading: true });
      this.fetchData();
    }
  }

  private fetchData() {
    API.findPages({
      slug: this.props.match.params.slug
    }).then(page => this.setState({ page: page[0], loading: false }));
  }

  render() {
    const backgroundImage =
      this.state.page && this.state.page.header
        ? `url(${Config.apiBase}${this.state.page.header.url})`
        : "";
    const pageContent = this.state.page ? this.state.page.content : "";

    const content = isHTML(pageContent) ? (
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    ) : (
      <ReactMarkdown source={pageContent} />
    );
    return (
      <div>
        <Navbar notFloating={true} />
        <div
          style={{
            height: "40vh",
            backgroundImage,
            backgroundColor: "#66cccc",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative"
          }}
        >
          <h1
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white"
            }}
          >
            {this.state.page ? this.state.page.title : ""}
          </h1>
        </div>
        <Loader loading={this.state.loading}>
          <div
            className="page-container"
            style={{
              maxWidth: "1000px",
              margin: "auto",
              padding: "2rem 1rem"
            }}
          >
            {content}
          </div>
        </Loader>
        <Section>
          <Footer />
        </Section>
      </div>
    );
  }
}
