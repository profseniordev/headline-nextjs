import React, { useState, useEffect, useRef } from 'react';
import './Filter.scss';
import PropTypes from 'prop-types';
import FilterIcon from '../../SVG/FilterIcon';
import CloseIcon from '../../SVG/CloseIcon';
import Button from '../../Button/Button';
import BottomDrawer from '../../DrawerSlider/BottomDrawer';
import HalftoneBorder from '../../HalftoneBorder/HalftoneBorder';
import Check from '../../SVG/Check';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

/**
 * Filter component for Masonry grid
 * @param {string} title
 * @param {string} filterTitle
 * @param {string} updateText
 * @param {string} cancelText
 * @param {Object[]} filterSections
 * @param {Object} filteredTags
 * @callback [setFilteredTags = () => {})] - Optional callback to update tag string
 * @returns {JSX.Element}
 * @constructor
 */
const Filter = ({ title, filterTitle, updateText, cancelText, filterSections, filteredTags, setFilteredTags = () => {} }) => {
    const [openFilter, setOpenFilter ] = useState(false);
    const [selectedTags, setSelectedTags ] = useState(filteredTags);
    const [windowWidth, setWindowWidth] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        setSelectedTags(filteredTags)
    }, [filteredTags]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, []);

    useEffect(() => {
        openFilter === true && windowWidth < 769 ? disableBodyScroll(scrollRef.current) : enableBodyScroll(scrollRef.current);
        return () => {
            if (openFilter === false && scrollRef.current) {
                scrollRef.current.scrollTop = 0;
            }
            clearAllBodyScrollLocks();
        };
    }, [openFilter]);

    /**
     * Submit filtered tags to grid
     * @param {string} tag
     * @param {string} sectionTitle
     */
    const updateSelectedTags = (tag, sectionTitle) => {
        const currentTags = selectedTags[sectionTitle];

        currentTags.length > 0 && currentTags.indexOf(tag) > -1 ? currentTags.splice(currentTags.indexOf(tag), 1) : currentTags.push(tag);

        setSelectedTags(prevState => ({
            ...prevState,
            [sectionTitle]: currentTags
        }));
    }

    /**
     * Submit filtered tags to grid
     * @param {Object} selectedTags
     */
    const updateFilteredTags = (selectedTags) => {
        setFilteredTags(selectedTags);
    }

    /**
     * Render filter section tags
     * @param {Object[]} filterSectionTags
     * @returns {*}
     */
    const renderTags = (filterSectionTags, sectionTitle) => filterSectionTags.map((tag, i) => {
        const combinedTag = `.${ sectionTitle }-${ tag.filter_tag.replace(/\\./g, '_') }`.trim().replace(/\s/g, '-').toLowerCase();

        return (
            <div key={ `tag-${ i }` } className="c-filter__tag-container" onClick={ () => updateSelectedTags(combinedTag, sectionTitle) }>
                <div className="c-filter__tag-selector">{ selectedTags[sectionTitle] && selectedTags[sectionTitle].indexOf(combinedTag) > -1 && <Check/> }</div>
                <p className="c-filter__heading ty-body bold">{ tag.filter_tag }</p>
            </div>
        );
    });

    /**
     * Render filter sections
     * @param {Object[]} filterSections
     * @returns {*}
     */
    const renderSections = filterSections => filterSections.map((section, i) => {
        const sectionTitle = section.primary.filter_section_title;

        return (
            <div key={ `section-${ i }` } className="c-filter__section-container">
                <h4 className="c-filter__heading c-filter__section-heading ty-h4">{ sectionTitle }</h4>
                { renderTags(section.items, sectionTitle) }
            </div>
        );
    });

    return (
        <div className="c-filter">
            <div className={ `c-filter__header ${ openFilter && 'is-open'}` }>
                <div className="c-filter__header-inner" onClick={ () => setOpenFilter(!openFilter) }>
                    <h4 className="c-filter__heading c-filter__main-heading ty-h4">{ title }</h4>

                    <div className={ `c-filter__filter-header ${ openFilter && 'is-open'}` }>
                        <h4 className="c-filter__filter-heading ty-h4">{ filterTitle }</h4>
                        { openFilter
                            ? <CloseIcon />
                            : <FilterIcon />
                        }
                    </div>
                </div>
                <div className="c-filter__filter-main">
                    <div className="c-filter__filter-main-sections">
                        { renderSections(filterSections) }
                        <div className="c-filter__button-container">
                            <Button addClass={ 'button-primary' }
                                    onClick={ () => {
                                        updateFilteredTags(selectedTags);
                                        setOpenFilter(false);
                                    } }>{ [updateText] }</Button>
                            <Button addClass={ 'button-primary-accent' } onClick={ () => setOpenFilter(false) }>{ [cancelText] }</Button>
                        </div>
                    </div>
                </div>
            </div>

            { windowWidth < 769 && <BottomDrawer addClass={"c-filter__filter-drawer"} isOpen={openFilter} setIsOpen={() => setOpenFilter} scrollLock={ false }>
                    <div className="c-filter__filter-mobile">
                        <div className="c-filter__filter-mobile-header-container">
                            <div
                                className={`c-filter__filter-header c-filter__filter-mobile-header ${openFilter && 'is-open'}`}
                                onClick={() => setOpenFilter(!openFilter)}>
                                <h4 className="c-filter__filter-heading c-filter__filter-mobile-heading ty-h4">{filterTitle}</h4>
                                <CloseIcon/>
                            </div>
                            <HalftoneBorder/>
                        </div>
                        <div className="c-filter__filter-main c-filter__filter-mobile-main" ref={ scrollRef }>
                            {renderSections(filterSections)}
                        </div>
                        <div className="c-filter__button-container">
                            <Button addClass={'button-primary'}
                                    onClick={() => {
                                        updateFilteredTags(selectedTags);
                                        setOpenFilter(false);
                                    }}>{[updateText]}</Button>
                            <Button addClass={'button-primary-accent'}
                                    onClick={() => setOpenFilter(false)}>{[cancelText]}</Button>
                        </div>
                    </div>
                </BottomDrawer> }
        </div>
    );
};

Filter.propTypes = {
    title: PropTypes.string,
    filterTitle: PropTypes.string,
    updateText: PropTypes.string,
    cancelText: PropTypes.string,
    loadText: PropTypes.string,
    filterSections: PropTypes.array,
    filteredTags: PropTypes.object,
    setFilteredTags: PropTypes.func
};

export default Filter;