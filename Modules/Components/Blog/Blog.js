import React, { useState } from 'react';
import { PRISMIC_CONFIG } from '../../../config/prismic';
import { PrismicHTML, linkResolver } from '../../Core/Prismic';
import './Blog.scss';
import SearchBar from './SearchBar/SearchBar';
import FeaturedArticle from './FeaturedArticle/FeaturedArticle';
import FeaturedTopic from './FeaturedTopic/FeaturedTopic';
import ArticleList from './ArticleList/ArticleList';
import Arrow from '../SVG/arrow';
import moment from "moment";
import PropTypes from 'prop-types';
import CloseIcon from '../SVG/CloseIcon';
import HalftoneBorder from '../HalftoneBorder/HalftoneBorder';
import HalftoneText from '../HalftoneText/HalftoneText';


/**
 * Blog page component
 * @param {Object} data - header data from Prismic
 * @param {Object[]} articlesData - Page data for rendering articles
 * @returns {JSX.Element}
 * @constructor
 */
const Blog = ({ data, featuredArticleData, recentArticlesData, featuredTopicArticles, taggedColumnArticles1, taggedColumnArticles2, taggedColumnArticles3}) => {
    const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const categories = data.body;
    const primaryCategories = categories.map((category) => category.primary.primary_tag);

    const urlTitle = PRISMIC_CONFIG.SEARCH;

    /**
     * Toggles to the mobile city filter modal.
     */
    const toggleCategoriesModal = () => {
        setCategoriesModalOpen(!categoriesModalOpen);
    };

    /**
     * Renders categories for blog filtering
     * @param data
     * @returns {*}
     */
    const renderCategories = (data) => {
        return data.map((category, i) => {
            return <li key={ `category-${ i }` } className="c-search-bar__category-name-container">
                <a
                    key={ i + 1 }
                    className={`c-blog__category-filter-button ${ activeCategoryId === i + 1 ? `is-active` : `` }` }
                    href={ `/blog/${ urlTitle }?q=${ category }` }
                >
                    { category }
                </a>
            </li>
        })
    };

    /**
     * Renders the category associated with each column
     * @param {object} columns - the columns data
     */
    const renderColumn = (columnHeading, columnTag, columnArticles) => {
        return <div className="c-blog__column">
            <div className="c-blog__column-inner">
                <div className="c-blog__column-title">
                    <h2>{ columnHeading }</h2>
                </div>
                { renderArticles(columnArticles) }
                <div className="c-blog__column-text-cta text-cta ty-link">
                    <a href={ `/blog/${ urlTitle }?q=${ columnTag }` }>
                        {`See all ${ columnTag } articles`} <Arrow />
                    </a>
                </div>
            </div>
        </div>
    };

    /**
     * Renders the articles associated with a category
     * @param article - articles for each column
     * @returns {*}
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

            const articleImage = thumbnail;
            const articleDate = postDate === null ? moment(postPublishedDate).format("ll") : moment(postDate).format("ll");

            return <div key={ `article-${ i }` } className="c-blog__category-article">
                { i === 0 && <a href={ linkResolver(article) }>
                    { articleImage && <div className="c-blog__column-article-image-container">
                        <div className="c-blog__column-article-image"
                             style={{ backgroundImage: `url(${ articleImage != undefined ? articleImage.url : `` })` }}></div>
                    </div>}
                </a>}
                <a className="c-blog__link" href={ linkResolver(article) }>
                    <div className="c-blog__column-article-title"
                         dangerouslySetInnerHTML={{ __html: PrismicHTML(postTitle) }}></div>
                </a>
                { i === 0 && <div className="c-blog__column-article-excerpt">
                    { abstract }
                </div> }
                <div className="c-blog__column-article-date">
                    <span>{ articleDate }</span>
                </div>
            </div>
        })
    };


    return (
        <div className="c-blog">
            <div className="c-blog__inner">
                <div className="c-blog__hero-main">
                    <a href={ '/blog' } className="c-blog__hero-title"><HalftoneText textObject={ data.hero_title } halftoneColor={ data.hero_halftone_color} /> </a>
                    <div className="c-blog__search-bar-container">
                        <SearchBar
                            renderCategories={ renderCategories }
                            categoriesData={ primaryCategories }
                            toggleCategoriesModal={ toggleCategoriesModal }
                        />
                    </div>
                </div>
                <div
                    className={ `c-blog__categories-modal-container ${ categoriesModalOpen ? `is-open` : `` }` }>
                    <div className="c-blog__categories-modal-inner">
                        <div className="c-blog__categories-modal-header">
                            <div className="c-blog__categories-modal-close-container">
                                <button className="c-blog__categories-modal-close"
                                        onClick={ toggleCategoriesModal }
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>
                        <div className="c-blog__categories-modal-title">
                            Choose Category
                        </div>
                        <ul>
                            <li>
                                <a
                                    className={ `c-blog__category-filter-button` }
                                    href={ `/blog/${ urlTitle }?q=All` }
                                >
                                    All Topics
                                </a>
                            </li>
                            { renderCategories(primaryCategories) }
                        </ul>
                    </div>
                </div>
                <div className="c-blog__row featured">
                    <div className="c-blog__featured-article-container">
                        <FeaturedArticle featuredArticleData={ featuredArticleData } />
                    </div>
                    <div className="c-blog__most-recent-column">
                        <ArticleList articleData={ recentArticlesData } columnTitle={ data.new_articles_title } recentHalftone={ data.recent_halftone_color }/>
                    </div>
                </div>
                <div className="c-blog__row">
                    <div className="c-blog__featured-topic-container">
                        <FeaturedTopic featuredTopicTitle={ data.featured_topic }
                                       featuredTopicHalftone={ data.featured_halftone_color }
                                       featuredTopicSummary={ data.featured_topic_description }
                                       featuredTopicCTAText={ data.featured_topic_button_text }
                                       featuredTopicArticlesData={ featuredTopicArticles }
                        />
                    </div>
                </div>
                <HalftoneBorder />
                <div className="c-blog__row last-child">
                    <div className="c-blog__categories-container">
                        { renderColumn(data.tagged_column_1_heading, data.tagged_column_1_associated_tag, taggedColumnArticles1) }
                        { renderColumn(data.tagged_column_2_heading, data.tagged_column_2_associated_tag, taggedColumnArticles2) }
                        { renderColumn(data.tagged_column_3_heading, data.tagged_column_3_associated_tag, taggedColumnArticles3) }
                    </div>
                </div>
            </div>
        </div>
    );
};

Blog.propTypes = {
};

export default Blog;