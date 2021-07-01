import React, { useState, useEffect, useRef } from 'react';
import './Grid.scss';
import PropTypes from 'prop-types';
import { linkResolver } from '../../../Core/Prismic';
import ExternalLink from '../../SVG/ExternalLink';
import Isotope from 'isotope-layout';
import Router from 'next/router';
import imagesLoaded from 'imagesloaded';

/**
 * Masonry grid component
 * @param {Object[]} items
 * @callback [setSelectedItem = () => {}] - Optional callback to update selected item
 * @param {Object} filteredTags
 * @param {Object[]} filterSections
 * @param {number} lastVisibleIndex
 * @callback [setLastVisibleIndex = () => {}] - Optional callback to update number of visible blocks
 * @param {boolean} openDetail
 * @callback [setOpenDetail = () => {}] - Optional callback to open/close detail drawer
 * @param {boolean} numResults
 * @callback setNumResults
 * @param {number} initialBlocksVisible
 * @returns {JSX.Element}
 * @constructor
 */
const Grid = ({ items, selectedItem, setSelectedItem = () => {}, filteredTags, filterSections, lastVisibleIndex, setLastVisibleIndex = () => {}, openDetail, setOpenDetail, numResults, setNumResults, initialBlocksVisible}) => {

    const ref = useRef(null);
    const [grid, setGrid] = useState();

    // reduce filter object to one string with all combinations separated by commas
    const filterCombinationStrings = (filteredTags) => {
        let filterStrings = [];
        let combinations = [{}];

        for (const [key, values] of Object.entries(filteredTags)) {
            combinations = combinations.flatMap((combination) => {
                if (values.length > 0) {
                    return values.map((value) => ({...combination, [key]: value}));
                } else {
                    return {...combination, [key]: ""};
                }
            })
        }

        combinations.map(combination => {
            filterStrings.push(Object.values(combination).join(''));
        })

        return filterStrings.join(', ');
    };

    // initialize isotope grid on first render
    useEffect(() => {
        setGrid(
            new Isotope (ref.current, {
                itemSelector: ".c-grid__block",
                layoutMode: "fitRows",
                percentPosition: true,
                fitRows: {
                    gutter: 0
                },
                filter: `*:nth-child(-n+${ lastVisibleIndex })`,
                transitionDuration: 0
            })
        )
    }, []);

    // refresh isotope layout after images load to update height of grid
    useEffect(() => {
        if (grid) {
            const imgLoad = new imagesLoaded(ref.current);
            imgLoad.on('progress', () => {
                grid.layout();
            });
        }
    }, [grid]);

    /**
     * Filter and refresh grid layout each time the filter is updated.
     * Isotope does not currently support pagination of filtered results, so
     * all results are displayed in original order and the last visible block index is reset.
     * */
    useEffect(() => {
        if (grid) {
            let filterString = filterCombinationStrings(filteredTags);
            setLastVisibleIndex(initialBlocksVisible + 1);
            grid.arrange({ filter: `${ filterString }` });
            grid.layout();
            setNumResults(grid.filteredItems.length);
        }
    }, [filteredTags]);

    // increase number of visible blocks each time the load more button increases the last visible index
    useEffect(() => {
        if (grid) {
            grid.arrange({ filter: `*:nth-child(-n+${ lastVisibleIndex })` })
        }
    }, [lastVisibleIndex]);

    /**
     * Format block tags to include section title
     * @param {string} tag
     * @returns {*}
     */
    const formatTag = (tag) => {
        let combinedTag = tag;
        filterSections.map((section, i) => {
            const sectionTitle = section.primary.filter_section_title;
            section.items.map((sectionTag, i) => {
                if ( tag === sectionTag.filter_tag) {
                    combinedTag = `${ sectionTitle }-${ tag.replace(/\./g, '_') }`.trim().replace(/\s/g, '-').toLowerCase();
                    return;
                }
            });
        });
        return combinedTag;
    }

    const openDetailDrawer = (item) => {
        setSelectedItem(item);
        setOpenDetail(true);
    }

    /**
     * Render grid blocks
     * @param {Object[]} items
     * @returns {*}
     */
    const renderBlocks = items => items.map((item, i) => {
        const tags = item.tags.map(tag => {
            let formattedTag = formatTag(tag);
            return formattedTag;
        }).join(' ');

        const image = item.data.listing_logo || item.data.partner_headshot;
        const mxWidth = item.data.partner_headshot ? '100' : item.data.listing_logo_width;
        const mxHeight = item.data.partner_headshot ? '100' : item.data.listing_logo_height;
        const hoverColor = item.data.partner_headshot_background_color || 'Green';

        return (
            <div key={ `block-${ i }` } className={ `c-grid__block background-hover-${ hoverColor } ${ tags }` }>
                <div className="c-grid__block-inner" onClick={ () => openDetailDrawer(item) }>
                    <div className="c-grid__logo-container">
                        <img
                            className="c-grid__logo"
                            src={ image.url }
                            alt={ image.alt }
                            style={{ maxWidth: `${ mxWidth || 50 }%`, maxHeight: `${ mxHeight || 50 }%` }}
                        />
                    </div>
                    <div className="c-grid__text-container">
                        <p className="c-grid__text ty-body bold">{ item.data.page_title[0].text } { item.data.job_title ? '' : <ExternalLink/> }</p>
                        { item.data.job_title && <p className="c-grid__subtext ty-body">{ item.data.job_title }</p> }
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="c-grid grid" ref={ref}>
            <div className="grid-sizer"></div>
            { renderBlocks(items) }
        </div>
    );
};

Grid.propTypes = {
    items: PropTypes.array,
    setSelectedItem: PropTypes.func,
    filterTags: PropTypes.object,
    filterSections: PropTypes.array,
    lastVisibleIndex: PropTypes.number,
    setLastVisibleIndex: PropTypes.func,
    initialBlocksVisible: PropTypes.number,
    openDetail: PropTypes.bool,
    setOpenDetail: PropTypes.func,
};

export default Grid;