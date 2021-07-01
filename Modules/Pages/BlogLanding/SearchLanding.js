import React, { Component } from 'react';
import Page from '../../Core/Page';
import SearchLanding from '../../Components/Blog/SearchLanding/SearchLanding'

class SearchContainer extends Component {

    render() {
        const { pageData: { data }, query, searchResults, currentPage } = this.props;

        return (
            <SearchLanding
                data={ data }
                query={ query.q }
                searchResults={ searchResults }
                currentPage={ currentPage }
            />
        );
    }
}

const Search = Page(SearchContainer);

export default Search;