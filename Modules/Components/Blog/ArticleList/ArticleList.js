import React from "react";
import {PrismicHTML, linkResolver} from '../../../Core/Prismic';
import "./ArticleList.scss";
import PropTypes from "prop-types";
import moment from "moment";
import { truncate } from '../utility/truncate';
import HalftoneText from '../../HalftoneText/HalftoneText';

/**
 *
 * @param articleData
 * @param pageData
 * @param columnTitle
 * @returns {*}
 * @constructor
 */
const ArticleList = ({ articleData, columnTitle,  recentHalftone = false }) => {

    const excerptLength = 78;

    /**
     *
     * @param articles
     * @returns {*}
     */
    const renderArticleElements = (articles) => {
        // Only render the 3 most recent articles
        return articles.map((article, i) => {
            const {
                data: {
                    document_title: postTitle,
                    abstract: postContent,
                    post_date: postDate,
                    thumbnail: postFeaturedImage
                },
                first_publication_date: postPublishedDate
            } = article;

            const articleImage = Object.entries(postFeaturedImage).length > 0 ? postFeaturedImage : postContent.find(item => item.type.includes("image"));
            const articleDate = postDate === null ? moment(postPublishedDate).format("ll") : moment(postDate).format("ll");
            const isFirstElement = i === 0;

            return <div key={article.uid} className="c-article-list__article-container">
                { isFirstElement && <a href={ linkResolver(article) }>
                    { articleImage && <div className="c-article-list__article-image-container">
                        <div className="c-article-list__article-image" style={{ backgroundImage: `url(${articleImage != undefined ? articleImage.url : `` })` }}></div>
                    </div> }
                </a> }
                <a className="c-article-list__article-link" href={ linkResolver(article) }>
                    <div className="c-article-list__article-title" dangerouslySetInnerHTML={{ __html: PrismicHTML(postTitle) }}></div>
                </a>
                { isFirstElement && <div className="c-article-list__article-excerpt">
                    { postContent }
                </div> }
                <div className="c-article-list__article-date">
                    <span>{ articleDate }</span>
                </div>
            </div>
        });
    };

    return (
        <>
            <div className="c-article-list__main">
                <div className="c-article-list__inner">
                    <div className="c-article-list__articles-container">
                        {
                            recentHalftone ? <div className="c-article-list__title"><HalftoneText textObject={ columnTitle } halftoneColor={ recentHalftone } /></div>
                            : <div className="c-article-list__title" dangerouslySetInnerHTML={{ __html: PrismicHTML(columnTitle) }}></div>
                        }

                        { renderArticleElements(articleData) }
                    </div>
                </div>
            </div>
        </>
    )
};

ArticleList.propTypes = {
    data: PropTypes.object
};

export default ArticleList;