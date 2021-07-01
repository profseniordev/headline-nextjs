import React, { Component } from 'react';
import { PRISMIC_CONFIG } from '../../config/prismic';
import BlogLanding from '../../Modules/Pages/BlogLanding/BlogLanding';

export default class BlogContainer extends Component {

    static async getInitialProps(context) {
        const fetchArticleData = async (context, prismic, pageData) => {
            const { req } = context;
            const featuredArticle = await prismic.queryById(req, pageData[0].data.featured_article.id);

            const mostRecentArticleIds = [pageData[0].data.recent_article_1.id, pageData[0].data.recent_article_2.id, pageData[0].data.recent_article_3.id];
            const mostRecentArticles = await prismic.queryByIds(req, mostRecentArticleIds);

            const featuredTopicArticleIds = [pageData[0].data.featured_topic_article_1.id, pageData[0].data.featured_topic_article_2.id];
            const featuredTopicArticles = await prismic.queryByIds(req, featuredTopicArticleIds);

            const taggedColumnArticleIds1 = pageData[0].data.tagged_column_1_articles.map(item => item.article.id );
            const taggedColumnArticles1 = await prismic.queryByIds(req, taggedColumnArticleIds1);

            const taggedColumnArticleIds2 = pageData[0].data.tagged_column_2_articles.map(item => item.article.id );
            const taggedColumnArticles2 = await prismic.queryByIds(req, taggedColumnArticleIds2);

            const taggedColumnArticleIds3 = pageData[0].data.tagged_column_3_articles.map(item => item.article.id );
            const taggedColumnArticles3 = await prismic.queryByIds(req, taggedColumnArticleIds3);

            return {
                featuredArticleData: featuredArticle,
                recentArticlesData: mostRecentArticles,
                featuredTopicArticles: featuredTopicArticles,
                taggedColumnArticles1: taggedColumnArticles1,
                taggedColumnArticles2: taggedColumnArticles2,
                taggedColumnArticles3: taggedColumnArticles3,
            };
        };

        return BlogLanding.getInitialProps(context, PRISMIC_CONFIG.DOC_TYPES.BLOG, fetchArticleData);
    }

    render() {
        return  <BlogLanding { ...this.props } />;
    }
}