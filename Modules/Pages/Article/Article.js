import React, { Component } from 'react';
import Page from '../../Core/Page';
import Article from '../../Components/Blog/Article/Article';

class ArticleContainer extends Component {

    render() {
        const { pageData: { data, tags }, similarArticles } = this.props;

        return (
            <Article
                data={ data }
                tags={ tags }
                similarArticles={ similarArticles }
            />
        );
    }
}

const ArticlePage = Page(ArticleContainer);

export default ArticlePage;
