import React from 'react';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { PRISMIC_CONFIG } from '../../config/prismic';

export const apiEndpoint = `https://${ PRISMIC_CONFIG.REPO }.cdn.prismic.io/api/v2`;
const accessToken = PRISMIC_CONFIG.ACCESS_TOKEN;

/**
 * This class is a wrapper around the Prismic API library which allows for
 * fetching data from the CMS.
 */
class PrismicIO extends React.Component {
    /**
     * @static async - Fetch prismic page data including header and footer.
     *
     * @param {object} context
     * @param {string} pageType
     * @param {string} slug
     * @return {object}
     */
    getInitialProps = async (context, pageType, slug = '') => {
        const { req } = context;
        const headerData = await this.queryByType(req, PRISMIC_CONFIG.DOC_TYPES.GLOBAL_HEADER);
        const footerData = await this.queryByType(req, PRISMIC_CONFIG.DOC_TYPES.GLOBAL_FOOTER);
        const bannerData = await this.queryByType(req, PRISMIC_CONFIG.DOC_TYPES.BANNER);

        // Assume page is a repeatable type if a slug is provided
        const pageData = slug ?
            await this.queryBySlug(req, pageType, slug) :
            await this.queryByType(req, pageType);

        return {
            headerData,
            footerData,
            bannerData,
            pageData
        };
    };

    /**
     * Check the request to determine which context the Client should be loaded in. (Preview)
     * @param {object} req
     * @returns {DefaultClient}
     */
    getClient = (req = null) => {
        if (!req && this._client)
            return this._client; // Prevents generating new instances for client side since we don't need the refreshed request object.
        else {
            // Reinitializes Client only if there's a req object present, which is used for Previews
            const options = Object.assign({}, req ? { req } : {}, accessToken ? { accessToken: accessToken } : {});

            // Connects to the given repository to facilitate data queries
            this._client = Prismic.client(apiEndpoint, options);

            return this._client
        }
    };

    /**
     * Fetches documents by their type (Case Study, Homepage, etc)
     *
     * @param {object} req
     * @param  {string} type
     * @return {object}
     */
    queryByType(req, type, returnFullObject = false, pageNumber = 1) {
        return this.query(() =>  {

            return this.getClient(req).query(
                Prismic.Predicates.at('document.type', type),
                { pageSize : 100, page: pageNumber }
            );

        }, returnFullObject);
    }

    /**
     * Fetches a single document by its ID.
     *
     * @param {object} req
     * @param  {string} id
     * @return {object}
     */
    queryById(req, id) {
        return this.query(() =>  {
            return this.getClient(req).getByID(id);
        });
    }

    /**
     * Fetches multiple documents by their ID.
     *
     * @param {object} req
     * @param  {string[]} ids
     * @return {object}
     */
    queryByIds(req, ids) {
        return this.query(() =>  {
            return this.getClient(req).query(
                Prismic.Predicates.in('document.id', ids), { pageSize : 100 }
            );
        });
    }

    /**
     * Fetches a single document based on the type and slug.
     * NOTE: Slugs are only unique among their document types.
     *
     * @param {object} req
     * @param  {string} type
     * @param  {string} slug
     * @return {object}
     */
    queryBySlug(req, type, slug) {
        return this.query(() =>  {
            return this.getClient(req).getByUID(type, slug);
        });
    }

    /**
     * Fetches all documents which have the specified tags.
     *
     * @param {object} req
     * @param  {string[]} tags
     * @return {object}
     */
    queryByTags(req, tags) {
        return this.query(() =>  {
            return this.getClient(req).query(
                Prismic.Predicates.at("document.tags", tags)
            );
        });
    }


    /**
     * Queries and returns posts that match text input.
     * @param req - request object
     * @param text - user inputted text
     * @param type - post type
     * @param page - the page of results
     * @returns {Promise<ApiSearchResponse>}
     */
    queryPostsByText(req, text, type, page) {
        const queryOptions = {
            orderings : '[document.first_publication_date desc]',
            pageSize: 12,
            page: page || 1
        };

        return this.getClient(req).query([
            Prismic.Predicates.at('document.type', type),
            Prismic.Predicates.fulltext('document', text)
        ], queryOptions)
    }


    /**
     * Sends a query to the Prismic API and returns either the result set or the object result
     *
     * @param  {function} queryFunction
     * @return {object|object[]}
     */
    query(queryFunction, returnFullObject = false) {
        const fetchData = async () => {
            const response = await queryFunction();

            return returnFullObject ? response : (response.results ? response.results : response);
        };

        return fetchData();
    }

}

/**
 * This tells prismic how to construct the URL for a particular document
 * from the CMS.
 */
export const linkResolver = doc => {
    // Define the url depending on the document type
    const { HOMEPAGE, PORTFOLIO, COMPANY, TEAM, PARTNER, BLOG, ARTICLE, CONTACT, LEGAL } = PRISMIC_CONFIG.DOC_TYPES;

    switch(true) {
        case doc.type === HOMEPAGE:
            return '/';
        case doc.type === PORTFOLIO:
            return '/portfolio';
        case doc.type === COMPANY:
            return `/portfolio/${ doc.uid }`;
        case doc.type === TEAM:
            return '/team';
        case doc.type === PARTNER:
            return `/team/${ doc.uid }`;
        case doc.type === BLOG:
            return '/blog';
        case doc.type === ARTICLE:
            return `/blog/post/${doc.uid}`
        case doc.type === CONTACT:
            return '/contact';
        case doc.type === LEGAL:
            return `/legal/${ doc.uid }`;
        default:
            return `/${ doc.uid }`;
    }
};

/**
 * Parses a Prismic link object.
 * @param link
 * @returns {*}
 * @constructor
 */
export const PrismicLink = link => {
    return PrismicDOM.Link.url(link, linkResolver);
};


/**
 * Returns rendered HTML from a Prismic RichText area.
 * @returns {HTML}
 */
export const PrismicHTML = prismicContent => {
    const HTMLString = PrismicDOM.RichText.asHtml(prismicContent, linkResolver);

    // Sometimes Prismic returns empty HTML tags... so check for those
    return HTMLString.replace(/<[^>]*>?/gm, '') === '' ? '' : HTMLString;
};

/**
 * Prismic somtimes does not name the slice property the same.
 * This may be because it does not clean up previous versions of the
 * CMS page during edits and saves. This method tries to determine
 * which property the data is under.
 */
export const PrismicSliceData = (documentData) => {
    return documentData.body1 || documentData.body;
};

export default PrismicIO
