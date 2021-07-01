import React, { Component } from 'react';
import ArticlePage from '../../../Modules/Pages/Article/Article';
import { PRISMIC_CONFIG } from '../../../config/prismic';

export default class PageContainer extends Component {

    static async getInitialProps(context) {

        const fetchRelatedArticleData = async (context, prismic, pageData) => {
            const { req } = context;

            if (pageData.data.similar_article_1.id !== undefined) {
                const relatedArticleIds = [pageData.data.similar_article_1.id, pageData.data.similar_article_2.id, pageData.data.similar_article_3.id];
                const relatedArticleData = await prismic.queryByIds(req, relatedArticleIds);

                return { similarArticles: relatedArticleData };
            }
        };

        return ArticlePage.getInitialProps(context, PRISMIC_CONFIG.DOC_TYPES.ARTICLE, fetchRelatedArticleData, context.query.slug);
    }

    render() {
        return  <ArticlePage { ...this.props } />;
    }
}