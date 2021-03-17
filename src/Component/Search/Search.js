import React, { Component } from "react";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  connectSearchBox,
} from "react-instantsearch-dom";
import Autocomplete from "./Autocomplete";
import "./Search.css";

const VirtalSearchBox = connectSearchBox(() => null);

const searchClient = algoliasearch(
  "5K3L830FWN",
  "35d3843c2a54cf8a7a59d20ea50ef518"
);

class Search extends Component {
  state = {
    query: "",
  };

  onSuggestionSelected = (_, { suggestion }) => {
    this.setState({
      query: suggestion.name,
    });
    window.open("/post/" + suggestion.objectID);
  };

  onSuggestionCleared = () => {
    this.setState({
      query: "",
    });
  };

  render() {
    const { query } = this.state;

    return (
      <div className="container">
        <InstantSearch indexName="Posts" searchClient={searchClient}>
          <Configure hitsPerPage={5} />
          <Autocomplete
            onSuggestionSelected={this.onSuggestionSelected}
            onSuggestionCleared={this.onSuggestionCleared}
          />
        </InstantSearch>
      </div>
    );
  }
}

export default Search;
