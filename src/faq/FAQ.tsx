import * as React from 'react';
import { Faq } from 'src/models/faq';
import { API } from 'src/services/api';
import ReactMarkdown from 'react-markdown';

interface State {
  faqs: Faq[];
}

export class FAQ extends React.Component {
  state: State = { faqs: [] };

  componentDidMount() {
    API.getFaqs().then(faqs => this.setState({ faqs }));
  }

  render() {
    return (
      <div className="accordion" id="accordion">
        {this.state.faqs.map((faq, i) => {
          const id = `faq-${i}`;
          return (
            <div className="card" key={i}>
              <div className="card-header p-0">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${id}`}
                    aria-expanded="true"
                    aria-controls={id}
                  >
                    {faq.question}
                  </button>
                </h2>
              </div>

              <div
                id={id}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body text-left pb-0">
                  <ReactMarkdown source={faq.answer} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
