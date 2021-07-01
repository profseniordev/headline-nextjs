import React from 'react';
import { PrismicHTML, PrismicLink } from '../../../Core/Prismic';
import './Article.scss';
import RelatedArticles from '../RelatedArticles/RelatedArticles';
import moment from "moment";
import CardQuote from '../../CardQuote/CardQuote';
import HalftoneBorder from '../../HalftoneBorder/HalftoneBorder';

/**
 *
 * @param
 * @returns {*}
 * @constructor
 */
const Article = ({ data, tags, similarArticles }) => {
    const postDate = data.post_date === null ? moment(data.first_publication_date).format('ll') : moment(data.post_date).format('ll');
    /**
     * Renders secondary tags associated with a post
     * @param tags - the tags
     * @returns {unknown[]}
     */
    const renderTags = (tags) => {
        return tags.map((item, i) => {
            return <a key={`tag-${i}`} href={`/blog/search?q=${item}`} className="c-article__tag-link">
                { item }
            </a>
        })
    };

    /**
     * Renders blocks
     * @param {Object[]} blocks
     * @returns {*}
     */
    const renderBlocks = blocks => blocks.map((block, i) => {
        switch (block.slice_type) {
            case 'quote':
                return <div key={ `block-${ i }` } className="c-article__content c-article__quote-container" >
                    <CardQuote quote={ block.primary.quote_text } halftoneColor={ block.primary.halftone_color } />
                </div>
            case 'text':
                return <div key={ `block-${ i }` } className="c-article__content c-article__text-container ty-body2"  dangerouslySetInnerHTML={{ __html: PrismicHTML(block.primary.content) }}></div>
            case 'image':
                return <div key={ `block-${ i }` } className="c-article__content c-article__image-container" >
                    <img className="c-article__image block-img" src={ block.primary.article_image.url } alt={ block.primary.article_image.alt } />
                    <p className="c-article__image-caption ty-caption">{ block.primary.article_image_caption }</p>
                </div>
            default:
                break;
        }
    });

    return (
        <div className="c-article__main">
            <div className="c-article__inner">
                <div className="c-article__hero-halftone-container">
                    <HalftoneBorder direction={ 'column' } color={ data.halftone_color }/>
                </div>
                <div className="c-article__hero-main">
                    <div className="c-article__hero-breadcrumbs ty-eyebrow">
                        { data.primary_tag[0] != null ? <span><a href={`/blog/search?q=${ data.primary_tag[0].text
                         }`} dangerouslySetInnerHTML={{ __html: PrismicHTML(data.primary_tag) }}></a></span> : `` }
                    </div>
                    <div className="c-article__hero-title ty-h1" dangerouslySetInnerHTML={{ __html: PrismicHTML(data.document_title) }}></div>
                    <div className="c-article__meta-container ty-body bold">
                        <div className="c-article__meta-author">
                            By <a href={ PrismicLink(data.author_link) }>{ data.author_name }</a>
                        </div>
                        <div className="c-article__meta-published-date">
                            · { postDate }
                        </div>
                    </div>
                </div>
            </div>
            { data.hero_image && <div className="c-article__hero-image-container">
                <img className="c-article__hero-image block-img" src={ data.hero_image.url } alt={ data.hero_image.alt } />
            </div> }
            { renderBlocks(data.body) }
            <div className="c-article__tags ty-body bold">
                <span className="c-article__tags-title ty-caption">Tags</span>
                <div className="c-article__tags-container">
                    { renderTags(tags) }
                </div>
            </div>
            { similarArticles !== undefined && <div className="c-article__related-articles">
                <HalftoneBorder />
                <RelatedArticles relatedArticlesData={ similarArticles } />
            </div> }
        </div>
    )
};

export default Article;
