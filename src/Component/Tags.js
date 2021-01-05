import React from "react";
import ReactDOM from "react-dom";
import ReactTags from "react-tag-autocomplete";

/**
 * Demo 1 - Country selector
 */

/**
 * Demo 2 - Custom tags
 */
class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [],
    };

    this.reactTags = React.createRef();
  }

  onDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  }

  onValidate(tag) {
    return /^[a-z]{3,12}$/i.test(tag.name);
  }

  render() {
    return (
      <>
        <p>Enter new tags meeting the requirements below:</p>
        <ReactTags
          allowNew={true}
          newTagPrefix="Create new tag: "
          ref={this.reactTags}
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          onDelete={this.onDelete.bind(this)}
          onAddition={this.onAddition.bind(this)}
          onValidate={this.onValidate.bind(this)}
        />
        <p style={{ margin: "0.25rem 0", color: "gray" }}>
          <small>
            <em>
              Tags must be 3–12 characters in length and only contain the
              letters A-Z
            </em>
          </small>
        </p>
        <p>
          <b>Output:</b>
        </p>
        <pre>
          <code>{JSON.stringify(this.state.tags, null, 2)}</code>
        </pre>
      </>
    );
  }
}

export default Tags;
