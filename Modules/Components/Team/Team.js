import React from 'react';
import './Team.scss';
import PropTypes from 'prop-types';
import TitleTextHero from '../TitleTextHero/TitleTextHero';
import PrinciplesBlocks from '../PrinciplesBlocks/PrinciplesBlocks';
import ListingGrid from '../ListingGrid/ListingGrid';

/**
 * Team page component
 * @param {Object} data - header data from Prismic
 * @param {Object[]} partnersData - Page data for rendering partners
 * @param {Object} query
 * @returns {JSX.Element}
 * @constructor
 */
const Team = ({ data, partnersData, query }) => {

    return (
        <div className="c-team">
            <TitleTextHero titleHalftone={ data.hero_title_halftone } titleNoHalftone={ data.hero_title_no_halftone } description={ data.hero_description } />
            <PrinciplesBlocks title={ data.principles_title } principles={ data.principles_block }/>
            <ListingGrid
                title={ data.team_list_title }
                filterTitle={ data.team_list_filter_title }
                updateText={ data.team_list_update_text }
                cancelText={ data.team_list_cancel_text }
                loadText={ data.team_list_load_text }
                filterSections={ data.body }
                items={ partnersData }
                numVisibleBlocks={ data.number_initial_blocks || 60 }
                landingPath={ 'team' }
                query={ query && query.slug }
                noResultsText={ data.no_results_content }
            />
        </div>
    );
};

Team.propTypes = {
    data: PropTypes.object,
    partnersData: PropTypes.array,
    query: PropTypes.object
};

export default Team;