import React, { useState, useEffect } from 'react';
import './ListingGrid.scss';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter';
import dynamic from 'next/dynamic'
const Grid = dynamic(import ('./Grid/Grid'), { ssr: false });
import CompanyDrawer from '../CompanyDrawer/CompanyDrawer';
import PartnerDrawer from '../PartnerDrawer/PartnerDrawer';
import Router from 'next/router';

/**
 * Masonry grid component
 * @param {string} title
 * @param {string} filterTitle
 * @param {string} updateText
 * @param {string} cancelText
 * @param {string} loadText
 * @param {Object[]} filterSections
 * @param {Object[]} items
 * @param {num} numVisibleBlocks
 * @param {string} landingPath
 * @param {string} query
 * @param {string} noResultsText
 * @returns {JSX.Element}
 * @constructor
 */
const ListingGrid = ({
        title,
        filterTitle,
        updateText,
        cancelText,
        loadText,
        filterSections,
        items,
        numVisibleBlocks,
        landingPath,
        query,
        noResultsText
     }) => {
    const initialBlocksVisible = numVisibleBlocks
    const [filteredTags, setFilteredTags ] = useState({});
    const [selectedItem, setSelectedItem ] = useState(false);
    const [lastVisibleIndex, setLastVisibleIndex] = useState(initialBlocksVisible + 1); // Increase by 1 to account for grid sizer element
    const [openDetail, setOpenDetail ] = useState(false);
    const [numResults, setNumResults ] = useState(items.length);
    let queryId;

    useEffect(() => {
        filterSections.forEach(section => {
            setFilteredTags(prevState => ({ ...prevState, [section.primary.filter_section_title]: [] }))
        })
        if (query) {
            queryId = items.find(item => item.uid === query);
            setSelectedItem(queryId);
            setOpenDetail(true)
        }
    }, []);

    useEffect(() => {
        if (!query && selectedItem !== false) {
            const privateUrl = `/${ landingPath }?slug=${ selectedItem.uid }`;
            const publicUrl = `/${ landingPath }/${ selectedItem.uid }`;
            Router.push(privateUrl, publicUrl, { shallow: true })
        }
    }, [selectedItem]);


    return (
        <div className="c-listing-grid">
            <Filter
                title={ title }
                filterTitle={ filterTitle }
                updateText={ updateText }
                cancelText={ cancelText }
                loadText={ loadText }
                filterSections={ filterSections }
                filteredTags={ filteredTags }
                setFilteredTags={ setFilteredTags }
            />
            <div className={ `c-listing-grid__main c-${ landingPath }-listing-grid__main` }>
                <Grid
                    items={ items }
                    selectedItem={ selectedItem }
                    setSelectedItem={ setSelectedItem }
                    filteredTags={ filteredTags}
                    filterSections={ filterSections }
                    lastVisibleIndex={ lastVisibleIndex }
                    setLastVisibleIndex={ setLastVisibleIndex }
                    initialBlocksVisible={ initialBlocksVisible }
                    openDetail={ openDetail }
                    setOpenDetail={ setOpenDetail }
                    numResults={ numResults }
                    setNumResults={ setNumResults }
                />
                { lastVisibleIndex < numResults && lastVisibleIndex < items.length && <button className="c-listing-grid__button button-primary" onClick={() => { setLastVisibleIndex(lastVisibleIndex + initialBlocksVisible)}}>{loadText}</button> }
                <div className={ `c-listing-grid__no-results-container ty-h2-alt ${ numResults === 0 ? 'is-visible' : '' }` }>
                    { noResultsText }
                </div>
            </div>
            { landingPath == 'portfolio' && <CompanyDrawer company={ selectedItem } isOpen={ openDetail } setIsOpen={ setOpenDetail } landingPath={ landingPath } /> }
            { landingPath == 'team' && <PartnerDrawer partner={ selectedItem } isOpen={ openDetail } setIsOpen={ setOpenDetail } landingPath={ landingPath } /> }
        </div>
    );
};

ListingGrid.propTypes = {
    title: PropTypes.string,
    filterTitle: PropTypes.string,
    updateText: PropTypes.string,
    cancelText: PropTypes.string,
    loadText: PropTypes.string,
    filterSections: PropTypes.array,
    items: PropTypes.array,
    numVisibleBlocks: PropTypes.number,
    landingPath: PropTypes.string,
    query: PropTypes.string
};

export default ListingGrid;