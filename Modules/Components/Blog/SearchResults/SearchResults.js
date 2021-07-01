import React from 'react';
import { PrismicHTML, linkResolver } from '../../../Core/Prismic';
import './SearchResults.scss';
import moment from 'moment';
import { truncate } from '../utility/truncate';

/**
 *
 * @param searchResultsData
 * @param searchText
 * @param activeCategory
 * @returns {*}
 * @constructor
 */
const SearchResults = ({ searchResultsData, activeCategory, searchText }) => {

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

            return <div key={ `article-${i}` } className="c-search-results__article">
                <div className="c-search-results__article-inner">
                    <a href={ linkResolver(article) }>
                        <div className="c-search-results__article-image-container">
                            <div className="c-search-results__article-image" style={{ backgroundImage: `url(${articleImage != undefined ? articleImage.url : `/static/article-image.jpg`})` }}></div>
                        </div>
                    </a>
                    <a className="c-search-results__article-link" href={ linkResolver(article) }>
                        <div className="c-search-results__article-title" dangerouslySetInnerHTML={{ __html: PrismicHTML(postTitle) }}></div>
                    </a>
                    <div className="c-search-results__article-excerpt">
                        { postContent }
                    </div>
                    <div className="c-search-results__article-date">
                        <span>{ articleDate }</span>
                    </div>
                </div>
            </div>
        })
    };

    return (
        <div className="c-search-results__main">
            <div className="c-search-results__inner">
                <div className="c-search-results__eyebrow">
                    {` ${ searchResultsData.total_results_size } results for "${ searchText !== "" ? searchText : `All` || activeCategory }"`}
                </div>
                <div className="c-search-results__results">
                    { renderArticles(searchResultsData.results || searchResultsData) }
                </div>
            </div>
        </div>
    )
};

export default SearchResults;