import React from 'react';
import { PrismicHTML, linkResolver } from '../../../Core/Prismic';
import './FeaturedTopic.scss';
import moment from "moment";
import { truncate } from '../utility/truncate';
import { PRISMIC_CONFIG } from '../../../../config/prismic';
import Arrow from '../../SVG/arrow'
import HalftoneText from '../../HalftoneText/HalftoneText';

const urlTitle = PRISMIC_CONFIG.SEARCH;

/**
 *
 * @param featuredTopicColumns
 * @param featuredTopicArticlesData
 * @returns {*}
 * @constructor
 */
const FeaturedTopic = ({ featuredTopicTitle, featuredTopicHalftone, featuredTopicSummary, featuredTopicCTAText, featuredTopicArticlesData }) => {

    /**
     * Renders articles associated with featured topic
     * @param articles
     * @returns {*}
     * @constructor
     */
    const renderArticles = (articles) => {
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
            const excerptLength = 78;

            return <div key={ `article-${i}` } className="c-featured-topic__column">
                <div className="c-featured-topic__column-inner">
                    { articleImage && <a href={ linkResolver(article) }>
                        <div className="c-featured-topic__article-image-container">
                            <div className="c-featured-topic__article-image" style={{ backgroundImage: `url(${articleImage != undefined ? articleImage.url : `/static/article-image.jpg`})` }}></div>
                        </div>
                    </a>}
                    <a className="c-featured-topic__article-link" href={ linkResolver(article) }>
                        <div className="c-featured-topic__article-title" dangerouslySetInnerHTML={{ __html: PrismicHTML(postTitle) }}></div>
                    </a>
                    <div className="c-featured-topic__article-excerpt">
                        { postContent }
                    </div>
                    <div className="c-featured-topic__article-date">
                        <span>{ articleDate }</span>
                    </div>
                </div>
            </div>
        })
    };

    return (
        <>
            <div className="c-featured-topic__main">
                <div className="c-featured-topic__inner">
                    <div className="c-featured-topic__columns-container">
                        <div className="c-featured-topic__column">
                            <div className="c-featured-topic__column-inner">
                                <div className="c-featured-topic__info-main">
                                    <div className="c-featured-topic__column-eyebrow">
                                        <span>Featured Topic</span>
                                    </div>
                                    <div className="c-featured-topic__column-title"><HalftoneText textObject={ featuredTopicTitle } halftoneColor={ featuredTopicHalftone } /></div>
                                    <div className="c-featured-topic__column-summary">
                                        {featuredTopicSummary}
                                    </div>
                                    <div className="c-featured-topic__column-text-cta text-cta ty-link">
                                        <a href={ `/blog/${ urlTitle }?q=${ featuredTopicTitle[0].text }` }>
                                            { featuredTopicCTAText } <Arrow />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { renderArticles(featuredTopicArticlesData) }
                    </div>
                </div>
            </div>
        </>
    )
};

export default FeaturedTopic;