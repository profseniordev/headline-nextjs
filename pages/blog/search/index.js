import React, { Component } from 'react';
import { PRISMIC_CONFIG } from '../../../config/prismic';
import { withRouter } from 'next/router';
import SearchLanding from '../../../Modules/Pages/BlogLanding/SearchLanding';

class Search extends Component {

    static async getInitialProps(context) {
        const fetchData = async (context, prismic, pageData) => {
            const { req } = context;
            const postType = PRISMIC_CONFIG.DOC_TYPES.ARTICLE;
            const { q, page } = context.query;

            const searchResults = q === "All" ?
                await prismic.queryPostsByText(req, '', postType, page === null ? 1 : page) :
                await prismic.queryPostsByText(req, decodeURIComponent(q), postType, page === null ? 1 : page);

            return {
                searchResults,
                currentPage: searchResults.page,
                searchQuery: q
            };
        };

        return SearchLanding.getInitialProps(context, PRISMIC_CONFIG.DOC_TYPES.BLOG, fetchData);
    }

    render() {
        return  <SearchLanding { ...this.props } />;
    }
}

export default withRouter(Search);