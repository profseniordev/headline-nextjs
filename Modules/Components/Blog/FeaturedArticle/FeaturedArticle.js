import React from 'react';
import { PrismicHTML, linkResolver } from '../../../Core/Prismic';
import './FeaturedArticle.scss';
import Arrow from '../../SVG/arrow';

/**
 *
 * @param featuredArticleData
 * @returns {*}
 * @constructor
 */
const FeaturedArticle = ({ featuredArticleData }) => {

    const featuredImage = featuredArticleData.data.thumbnail;

    return (
        <div className="c-featured-article__main">
            <div className="c-featured-article__inner">
                <div className="c-featured-article__content">
                    { featuredImage && <div className="c-featured-article__image-container">
                        <a href={ linkResolver(featuredArticleData) }>
                            <div className="c-featured-article__image" style={{ backgroundImage: `url(${ featuredImage != undefined ? featuredImage.url : ``})` }}></div>
                        </a>
                    </div>}
                    <div className="c-featured-article__information">
                        <a className="c-featured-article__link" href={ linkResolver(featuredArticleData) }>
                            <div className="c-featured-article__title" dangerouslySetInnerHTML={{ __html: PrismicHTML(featuredArticleData.data.document_title) }}></div>
                        </a>
                        <div className="c-featured-article__summary">{ featuredArticleData.data.abstract }</div>
                        <div className="c-featured-article__text-cta text-cta">
                            <a className="ty-link" href={ linkResolver(featuredArticleData) }>
                                Read more <Arrow />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default FeaturedArticle;