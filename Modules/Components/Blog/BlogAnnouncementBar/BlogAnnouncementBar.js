import React from 'react';
import PropTypes from 'prop-types';
import './BlogAnnouncementBar.scss';

/**
 * Renders the Announcement Bar above the header.
 * @param {string} textColor - HEX code string from Prismic.
 * @param {string} backgroundColor - HEX code string from Prismic.
 * @param {string} link - Link from Prismic.
 * @param {string} text - Text from Prismic.
 */
const BlogAnnouncementBar = ({ backgroundColor, link, text, image, ctaBackgroundColor, ctaHoverBackgroundColor, ctaText, ctaTextColor }) => {
    return (
        <>
            <div className="c-blog-announcement-bar__main">
                <div className="c-blog-announcement-bar__inner">
                    <div className="c-blog-announcement-bar__text-container">
                        <p className="c-blog-announcement-bar__text">
                            {text}
                        </p>
                        {/*<CallToAction*/}
                        {/*    ctaIsModal={ "No" }*/}
                        {/*    ctaText={ ctaText }*/}
                        {/*    ctaBackgroundColor={ ctaBackgroundColor }*/}
                        {/*    ctaHoverBackgroundColor={ ctaHoverBackgroundColor }*/}
                        {/*    ctaTextColor={ ctaTextColor }*/}
                        {/*    ctaLink = { link }*/}
                        {/*/>*/}
                    </div>
                </div>
                { image && <div className="c-blog-announcement-bar__image-container">
                    <img src={ image.url } alt={ image.alt } />
                </div> }
            </div>
            <style jsx>{`
                .c-blog-announcement-bar__main {
                    background-color: ${ backgroundColor };
                }
            `}</style>
        </>
    )
};

export default BlogAnnouncementBar;