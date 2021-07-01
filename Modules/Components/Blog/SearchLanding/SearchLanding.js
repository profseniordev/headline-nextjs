import React, { useEffect, useState } from 'react';
import { PRISMIC_CONFIG } from '../../../../config/prismic';
import { PrismicHTML, linkResolver } from '../../../Core/Prismic';
import '../Blog.scss';
import SearchBar from '../SearchBar/SearchBar';
import ArticleList from '../ArticleList/ArticleList';
import SearchResults from '../SearchResults/SearchResults';
import Arrow from '../../SVG/arrow';
import moment from "moment";
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';


/**
 * Search page component
 * @param {Object} data - header data from Prismic
 * @param {Object[]} articlesData - Page data for rendering articles
 * @returns {JSX.Element}
 * @constructor
 */
const SearchLanding = ({ data, query, searchResults, currentPage }) => {
    const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
    const [searchText, setSearchText] = useState(null);
    const categories = data.body;
    const primaryCategories = categories.map((category) => category.primary.primary_tag);
    const [activeCategory, setActiveCategory] = useState(primaryCategories.includes(query) ? query : query === "All" ? "All Topics" : null);
    const [activeCategoryId, setActiveCategoryId] = useState();

    const urlTitle = PRISMIC_CONFIG.SEARCH;
    const pageUrl = `&page=`;

    useEffect(() => {
        setActiveCategoryId(getInitialActiveCategoryIndex());
    }, []);

    /**
     * Gets initial active category from URL search query
     */
    const getInitialActiveCategoryIndex = () => {
        const activeCategoryIndex = primaryCategories.findIndex((item) => item === query);

        return activeCategoryIndex !== -1 ? activeCategoryIndex + 1 : null;
    };

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
     * Send users to the page they clicked
     * @param pageNumber - the page number
     */
    const handlePageChange = (pageNumber) => {
        if (typeof window !== 'undefined') {
            window.location = `/blog/${urlTitle}?q=${this.props.searchQuery}${pageUrl}${pageNumber}`;
        }
    }

    /**
     * Plugin prevents default of clicked links, so this is purely for rendering the href for crawlers
     * @param pageNumber - the page number
     * @returns {string}
     */
    const getPageUrl = (pageNumber) => {
        return `/blog/${urlTitle}?q=${query}${pageUrl}${pageNumber}`;
    };


    return (
        <div className="c-blog">
            <div className="c-blog__inner">
                <div className="c-blog__hero-main">
                    <a href={ '/blog' } className="c-blog__hero-title"
                       dangerouslySetInnerHTML={{ __html: PrismicHTML(data.hero_title) }}></a>
                    <div className="c-blog__search-bar-container">
                        <SearchBar
                            renderCategories={ renderCategories }
                            categoriesData={ primaryCategories }
                            toggleCategoriesModal={ toggleCategoriesModal }
                        />
                    </div>
                </div>
                <div className="c-blog__search-results-container">
                    <SearchResults
                        searchResultsData={ searchResults }
                        activeCategory={ activeCategory }
                        searchText={ query }
                    />
                </div>
                { searchResults.total_pages > 1 && <div className="c-blog__pagination-container">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={searchResults.results_per_page}
                        totalItemsCount={searchResults.total_results_size}
                        pageRangeDisplayed={6}
                        innerClass={`c-blog__pagination-container-inner`}
                        itemClass={`c-blog__pagination-item`}
                        hideDisabled={false}
                        hideFirstLastPages={true}
                        nextPageText={ <svg height="40" viewBox="0 0 40 40" width="40">
                            <g fill="none" fillRule="evenodd">
                                <rect fill="#ebf0f5" height="40" rx="20" width="40"/>
                                <path d="m1.566.063c.111.077.244.131.363.2.069.041.14.082.187.144.045.059.968.772.96.834.077.049.116.077.17.127.107.102.223.196.301.325.07.117.14.233.239.322.104.096.203.198.309.292.11.1.235.185.339.291.106.11.188.242.29.355.052.057.132.088.185.144.037.039.045.106.077.149.023.032.064.047.098.069.01.006.032 0 .038.009.098.133.198.263.292.4l-.114-.074c.175.107.446.33.596.52.17.217.138.314.105.417-.097.305-.371.416-.532.655-.144.214-.366.354-.563.518-.09.075-.156.173-.24.254-.152.148-.309.293-.464.438-.12.112-.246.219-.36.337-.1.106-.184.229-.283.337-.042.046-.106.07-.155.11-.105.088-.207.18-.31.27-.061.052-.125.102-.181.16-.104.105-.134.329-.247.442s-.879.864-.994.994c-.116.131-.155.288-.373.306-.234-.191-.497-.413-.647-.642a.94.94 0 0 1 -.14-.35c-.049-.239-.064-.446.024-.574.077-.111.131-.244.2-.363.041-.069.081-.14.144-.187.059-.045.772-.968.834-.96.049-.077.076-.116.127-.17.101-.107.196-.223.325-.301.117-.07.233-.14.322-.239.096-.104.197-.203.292-.309.099-.11.185-.235.291-.339.11-.106.242-.188.354-.29.058-.052.089-.132.145-.185.024-.023.058-.035.091-.048a.244.244 0 0 0 -.014-.018c-.074-.089-.172-.156-.253-.24-.148-.152-.293-.309-.438-.464-.112-.12-.219-.246-.337-.359-.106-.101-.229-.185-.337-.284-.046-.042-.07-.106-.11-.155-.088-.105-.18-.207-.27-.31-.052-.061-.102-.125-.16-.181-.105-.104-.329-.133-.442-.247-.113-.113-.864-.879-.994-.993-.131-.116-.288-.156-.306-.374.191-.234.413-.496.642-.646a.94.94 0 0 1 .35-.14c.239-.049.446-.063.574.024z" fill="#0b4a72" fillRule="nonzero" transform="translate(17 15)"/>
                            </g>
                        </svg> }
                        prevPageText={ <svg height="40" viewBox="0 0 40 40" width="40">
                            <g fill="none" fillRule="evenodd">
                                <rect fill="#ebf0f5" height="40" rx="20" width="40"/>
                                <path d="m1.566.063c.111.077.244.131.363.2.069.041.14.082.187.144.045.059.968.772.96.834.077.049.116.077.17.127.107.102.223.196.301.325.07.117.14.233.239.322.104.096.203.198.309.292.11.1.235.185.339.291.106.11.188.242.29.355.052.057.132.088.185.144.037.039.045.106.077.149.023.032.064.047.098.069.01.006.032 0 .038.009.098.133.198.263.292.4l-.114-.074c.175.107.446.33.596.52.17.217.138.314.105.417-.097.305-.371.416-.532.655-.144.214-.366.354-.563.518-.09.075-.156.173-.24.254-.152.148-.309.293-.464.438-.12.112-.246.219-.36.337-.1.106-.184.229-.283.337-.042.046-.106.07-.155.11-.105.088-.207.18-.31.27-.061.052-.125.102-.181.16-.104.105-.134.329-.247.442s-.879.864-.994.994c-.116.131-.155.288-.373.306-.234-.191-.497-.413-.647-.642a.94.94 0 0 1 -.14-.35c-.049-.239-.064-.446.024-.574.077-.111.131-.244.2-.363.041-.069.081-.14.144-.187.059-.045.772-.968.834-.96.049-.077.076-.116.127-.17.101-.107.196-.223.325-.301.117-.07.233-.14.322-.239.096-.104.197-.203.292-.309.099-.11.185-.235.291-.339.11-.106.242-.188.354-.29.058-.052.089-.132.145-.185.024-.023.058-.035.091-.048a.244.244 0 0 0 -.014-.018c-.074-.089-.172-.156-.253-.24-.148-.152-.293-.309-.438-.464-.112-.12-.219-.246-.337-.359-.106-.101-.229-.185-.337-.284-.046-.042-.07-.106-.11-.155-.088-.105-.18-.207-.27-.31-.052-.061-.102-.125-.16-.181-.105-.104-.329-.133-.442-.247-.113-.113-.864-.879-.994-.993-.131-.116-.288-.156-.306-.374.191-.234.413-.496.642-.646a.94.94 0 0 1 .35-.14c.239-.049.446-.063.574.024z" fill="#0b4a72" fillRule="nonzero" transform="translate(17 15)"/>
                            </g>
                        </svg> }
                        linkClass={`c-blog__pagination-nav-item`}
                        linkClassPrev={`c-blog__pagination-prev`}
                        linkClassNext={`c-blog__pagination-next`}
                        onChange={() => handlePageChange(currentPage)}
                        getPageUrl={() => getPageUrl(currentPage)}
                    />
                </div>  }
                <div
                    className={`c-blog__categories-modal-container ${categoriesModalOpen ? `is-open` : ``}`}
                >
                    <div className="c-blog__categories-modal-inner">
                        <div className="c-blog__categories-modal-header">
                            <div className="c-blog__categories-modal-close-container">
                                <button className="c-blog__categories-modal-close"
                                        onClick={toggleCategoriesModal}>
                                    <svg width="24px" height="14px" viewBox="0 0 24 14" version="1.1">

                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none"
                                           fillRule="evenodd">
                                            <g id="Hamburger-(1)" fill="#0b4a72" fillRule="nonzero">
                                                <g id="hamburger-top"
                                                   transform="translate(0.000000, 0.500000)">
                                                    <path
                                                        d="M1.76528594,2.45737514 C1.16885044,2.47118178 0.693838882,2.57447594 0.121607506,2.3983986 C0.0162868408,2.02221014 -0.0836369578,1.5940337 0.109996066,1.25858336 C0.223820884,1.06119948 0.421051819,0.934212434 0.616320256,0.826486514 C1.07897889,0.571319262 1.54621669,0.37495809 2.06791377,0.340015347 C2.52435783,0.309504366 2.97802169,0.239618879 3.43381158,0.196153516 C3.69972991,0.17092656 3.96842844,0.14399508 4.23401968,0.157290367 C4.48701823,0.16956294 8.45504058,-0.0158892775 8.58514675,0.0454735887 C8.88786189,0.0214397995 9.04998698,0.0113831075 9.30265845,0.00865586901 C9.80947326,0.00320139201 10.3189047,-0.0158892775 10.8224487,0.0294510626 C11.2757855,0.0700187352 11.7265056,0.110927313 12.1816413,0.103086502 C12.6668687,0.0949047865 13.1525867,0.0979729298 13.6381411,0.0879162379 C14.1477361,0.0773481887 14.6573311,0.0427463502 15.1669262,0.0454735887 C15.6879691,0.0483712796 16.209012,0.092177548 16.7302184,0.101722883 C16.9959732,0.106836455 17.2625457,0.0642233534 17.528464,0.0662687823 C17.7109763,0.0679733064 17.8925072,0.119790838 18.0753465,0.130017982 C18.2094505,0.137517888 18.3453534,0.115359075 18.480275,0.103597859 C18.5188708,0.100188811 18.5571395,0.0759845694 18.594754,0.0780299983 C19.2634748,0.115359075 19.9325227,0.147404128 20.6004258,0.197517135 C21.3062705,0.250357381 22.0426975,0.146722318 22.7356224,0.245243809 C23.1413686,0.303027174 23.547769,0.494786131 23.780979,0.845577183 C23.9464829,1.0944377 24.0621067,1.53113676 23.9638183,1.83130345 C23.8511383,2.17391278 23.5379565,2.23135525 23.2077664,2.29339992 C22.2330596,2.47680671 21.2990747,2.33294488 20.330746,2.4016372 C19.4618505,2.46300007 18.5854321,2.3908987 17.7091773,2.3626036 C17.3111175,2.34964922 16.9120765,2.37641024 16.5135261,2.37453527 C15.7838043,2.37095577 15.053919,2.36004681 14.3241973,2.35135374 C13.7617784,2.3447061 13.199196,2.3274904 12.6367771,2.33209262 C12.1351956,2.33618348 11.6339412,2.37027396 11.1323597,2.37828522 C10.9184475,2.38169427 10.7040447,2.34675152 10.4898055,2.33959252 C10.0210958,2.32374045 9.55238617,2.31419511 9.08351297,2.30260435 C8.80810924,2.2956158 8.53270551,2.28283187 8.25746533,2.28402504 C7.74917864,2.28624092 7.13632861,2.45737514 6.58705342,2.45737514 C6.03777822,2.45737514 2.36204853,2.44373894 1.76528594,2.45737514 Z"
                                                        id="path-1"></path>
                                                </g>
                                                <g id="hamburger-bottom"
                                                   transform="translate(0.000000, 11.500000)">
                                                    <path
                                                        d="M1.76528594,2.4573751 C1.16885044,2.4711818 0.693838882,2.5744759 0.121607506,2.3983986 C0.0162868408,2.0222101 -0.0836369578,1.5940337 0.109996066,1.2585834 C0.223820884,1.0611995 0.421051819,0.9342124 0.616320256,0.8264865 C1.07897889,0.5713193 1.54621669,0.3749581 2.06791377,0.3400153 C2.52435783,0.3095044 2.97802169,0.2396189 3.43381158,0.1961535 C3.69972991,0.1709266 3.96842844,0.1439951 4.23401968,0.1572904 C4.48701823,0.1695629 8.45504058,-0.0158893 8.58514675,0.0454736 C8.88786189,0.0214398 9.04998698,0.0113831 9.30265845,0.0086559 C9.80947326,0.0032014 10.3189047,-0.0158893 10.8224487,0.0294511 C11.2757855,0.0700187 11.7265056,0.1109273 12.1816413,0.1030865 C12.6668687,0.0949048 13.1525867,0.0979729 13.6381411,0.0879162 C14.1477361,0.0773482 14.6573311,0.0427464 15.1669262,0.0454736 C15.6879691,0.0483713 16.209012,0.0921775 16.7302184,0.1017229 C16.9959732,0.1068365 17.2625457,0.0642234 17.528464,0.0662688 C17.7109763,0.0679733 17.8925072,0.1197908 18.0753465,0.130018 C18.2094505,0.1375179 18.3453534,0.1153591 18.480275,0.1035979 C18.5188708,0.1001888 18.5571395,0.0759846 18.594754,0.07803 C19.2634748,0.1153591 19.9325227,0.1474041 20.6004258,0.1975171 C21.3062705,0.2503574 22.0426975,0.1467223 22.7356224,0.2452438 C23.1413686,0.3030272 23.547769,0.4947861 23.780979,0.8455772 C23.9464829,1.0944377 24.0621067,1.5311368 23.9638183,1.8313034 C23.8511383,2.1739128 23.5379565,2.2313552 23.2077664,2.2933999 C22.2330596,2.4768067 21.2990747,2.3329449 20.330746,2.4016372 C19.4618505,2.4630001 18.5854321,2.3908987 17.7091773,2.3626036 C17.3111175,2.3496492 16.9120765,2.3764102 16.5135261,2.3745353 C15.7838043,2.3709558 15.053919,2.3600468 14.3241973,2.3513537 C13.7617784,2.3447061 13.199196,2.3274904 12.6367771,2.3320926 C12.1351956,2.3361835 11.6339412,2.370274 11.1323597,2.3782852 C10.9184475,2.3816943 10.7040447,2.3467515 10.4898055,2.3395925 C10.0210958,2.3237404 9.55238617,2.3141951 9.08351297,2.3026044 C8.80810924,2.2956158 8.53270551,2.2828319 8.25746533,2.284025 C7.74917864,2.2862409 7.13632861,2.4573751 6.58705342,2.4573751 C6.03777822,2.4573751 2.36204853,2.4437389 1.76528594,2.4573751 Z"
                                                        id="path-3"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="c-blog__categories-modal-title">
                            Choose Category
                        </div>
                        <ul>
                            <li>
                                <a
                                    className={`c-blog__category-filter-button ${activeCategoryId === 0 ? `is-active` : ``}`}
                                    href={`/blog/${urlTitle}?q=All`}
                                >
                                    All Topics
                                </a>
                            </li>
                            { renderCategories(primaryCategories) }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

SearchLanding.propTypes = {
};

export default SearchLanding;