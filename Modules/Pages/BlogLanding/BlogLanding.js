import React, { Component } from 'react';
import Page from '../../Core/Page';
import Blog from '../../Components/Blog/Blog'

class BlogLandingContainer extends Component {

    render() {
        const { pageData: { data }, featuredArticleData, recentArticlesData, featuredTopicArticles, taggedColumnArticles1, taggedColumnArticles2, taggedColumnArticles3 } = this.props;

        return (
            <Blog
                data={ data }
                featuredArticleData={ featuredArticleData }
                recentArticlesData={ recentArticlesData }
                featuredTopicArticles={ featuredTopicArticles }
                taggedColumnArticles1={ taggedColumnArticles1 }
                taggedColumnArticles2={ taggedColumnArticles2 }
                taggedColumnArticles3={ taggedColumnArticles3 }
            />
        );
    }
}

const BlogLanding = Page(BlogLandingContainer);

export default BlogLanding;