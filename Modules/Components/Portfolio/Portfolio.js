import React from 'react';
import './Portfolio.scss';
import PropTypes from 'prop-types';
import TitleImageHero from '../TitleImageHero/TitleImageHero';
import FeaturedCarousel from '../FeaturedCarousel/FeaturedCarousel';
import ListingGrid from '../ListingGrid/ListingGrid';

/**
 * Portfolio page component
 * @param {object} data - header data from Prismic
 * @param {object[]} companiesData - Page data for rendering companies
 * @returns {JSX.Element}
 * @constructor
 */
const Portfolio = ({ data, companiesData, query }) => {
    return (
        <div className="c-portfolio">
            <TitleImageHero
                title={ data.hero_text }
                subtitle={ data.hero_subtitle_text }
                desktopImageURL={ data.hero_background_image.url }
                desktopImageAlt={ data.hero_background_image.alt }
                tabletImage={ data.hero_background_image.Tablet }
                mobileImage={ data.hero_background_image.Mobile }
                backgroundColor={ data.hero_background_color } />
            <FeaturedCarousel
                title={ data.featured_companies_section_title }
                featuredItems={ data.featured_companies }
            />
            <ListingGrid
                title={ data.portfolio_list_title }
                filterTitle={ data.portfolio_list_filter_title }
                updateText={ data.portfolio_list_update_text }
                cancelText={ data.portfolio_list_cancel_text }
                loadText={ data.portfolio_list_load_text }
                filterSections={ data.body }
                items={ companiesData }
                numVisibleBlocks={ data.number_initial_blocks || 60 }
                landingPath={ 'portfolio' }
                query={ query && query.slug }
                noResultsText={ data.no_results_content }
            />
        </div>
    );
};

Portfolio.propTypes = {
    data: PropTypes.object,
    companiesData: PropTypes.array
};

export default Portfolio;