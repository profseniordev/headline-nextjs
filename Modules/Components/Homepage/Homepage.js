import React, { useEffect, useState } from 'react';
import './Homepage.scss';
import PropTypes from 'prop-types';
import TextHero from '../TextHero/TextHero';
import Portfolio from '../Portfolio/Portfolio';
import Ticker from '../Ticker/Ticker';

/**
 * Repeatable Text Hero component
 * @param {object} data - header data from Prismic
 * @param {object} portfolioData - Page data for rendering Portfolio component on mobile
 * @param {object[]} companiesData - Company page data for rendering the Portfolio component
 * @returns {JSX.Element}
 * @constructor
 */
const Homepage = ({ data, portfolioData, companiesData }) => {
    const [windowWidth, setWindowWidth] = useState(null);
    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    if (windowWidth > 768) {
        return (
            <div className="c-homepage">
                <div className="c-homepage__container">
                    <TextHero
                        title={ data.portfolio_title }
                        color={ data.portfolio_section_color }
                        image={ data.portfolio_hover_image }
                        description={ data.portfolio_description }
                        links={ data.company }
                        linkText={ data.portfolio_link_text }
                        linkURL={ data.portfolio_url }
                    />
                    <TextHero
                        title={ data.team_title }
                        color={ data.team_section_color }
                        image={ data.team_hover_image }
                        description={ data.team_description }
                        largeDescription={ data.team_large_description }
                        linkText={ data.team_link_text }
                        linkURL={ data.team_url }
                    />
                    <TextHero
                        title={ data.contact_title }
                        color={ data.contact_section_color }
                        image={ data.contact_hover_image }
                        description={ data.contact_description }
                        links={ data.locations }
                        linkText={ data.contact_link_text }
                        linkURL={ data.contact_url }
                    />
                    { data.display_ticker && <Ticker logoUrl={data.ticker_logo.url} logoAlt={data.ticker_logo.alt} list={data.ticker_entry} timePerItem={data.time_per_entry}/> }
                </div>
            </div>
        );
    } else {
        return (
            <div className="c-homepage"><Portfolio data={ portfolioData.data } companiesData={ companiesData }/></div>
        )
    }
};

Homepage.propTypes = {
    data: PropTypes.object,
    portfolioData: PropTypes.object,
    companiesData: PropTypes.array
};

export default Homepage;
