import React from 'react';
import { PrismicHTML, linkResolver } from '../../../Core/Prismic';
import './RelatedArticles.scss';
import moment from "moment";
import { truncate } from '../utility/truncate';
import HalftoneText from '../../HalftoneText/HalftoneText';

/**
 *
 * @param relatedArticlesColumns
 * @param relatedArticlesData
 * @returns {*}
 * @constructor
 */
const RelatedArticles = ({ relatedArticlesData }) => {

    /**
     * Checks that the articles data is valid
     * @param data
     * @returns {boolean}
     */
    const isValid = (data) => {
        if (data.length > 0 && data[0]) {
            return true;
        }
    };

    /**
     * Renders articles
     * @param articles
     * @returns {*}
     * @constructor
     */
    const renderArticles = (articles) => {
        return articles.map((article, i) => {
            const {
                data: {
                    document_title: postTitle,
                    abstract: abstract,
                    post_date: postDate,
                    thumbnail: thumbnail
                },
                first_publication_date: postPublishedDate
            } = article;

            const articleDate = postDate === null ? moment(postPublishedDate).format("ll") : moment(postDate).format("ll");
            // const excerptLength = 78;

            return <div key={ `article-${i}` } className="c-blog__column">
                <div className="c-blog__column-inner">
                    { thumbnail && <a href={ linkResolver(article) }>
                        <div className="c-related-articles__article-image-container ty-body">
                            <div className="c-related-articles__article-image" style={{ backgroundImage: `url(${thumbnail != undefined ? thumbnail.url : ``})` }}></div>
                        </div>
                    </a>}
                    <a className="c-related-articles__article-link" href={ linkResolver(article) }>
                        <div className="c-related-articles__article-title ty-h5" dangerouslySetInnerHTML={{ __html: PrismicHTML(postTitle) }}></div>
                    </a>
                    <div className="c-related-articles__article-excerpt">
                        { abstract }
                    </div>
                    <div className="c-related-articles__article-date">
                        <span>{ articleDate }</span>
                    </div>
                </div>
            </div>
        })
    };

    if (isValid(relatedArticlesData)) {
        return (
            <>
                <div className="c-related-articles__main">
                    <div className="c-related-articles__inner">
                        <div className="c-related-articles__title">
                            <h3><HalftoneText textObject={ 'Similar Articles' } halftoneColor={ 'Blue' } /></h3>
                        </div>
                        <div className="c-related-articles__columns-container">
                            { renderArticles(relatedArticlesData) }
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (<></>)
    }
};

export default RelatedArticles;
