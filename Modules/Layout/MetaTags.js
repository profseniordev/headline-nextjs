import React from 'react';
import { linkResolver } from '../Core/Prismic';
import Head from 'next/head';
import { MAIN_CONFIG } from '../../config/main';

export default class MetaTags extends React.Component {

    render() {
        const { pageData, isArticle } = this.props;
        const document = pageData[0] ? pageData[0] : pageData;
        const data = document.data;

        if (!data) return <></>;

        return (
            <Head>
                { data.meta_title && <title>{data.meta_title}</title> }
                { data.meta_description && <meta name="description" content={data.meta_description} /> }
                <meta property="og:url" content={`${MAIN_CONFIG.BASE_URL}${linkResolver(document)}`} />
                {isArticle && <meta property="og:type" content="article" /> }
                { data.social_title && <meta property="og:title" content={data.social_title} /> }
                { data.social_description && <meta property="og:description" content={data.social_description} /> }
                { data.social_image && data.social_image.url && <meta property="og:image" content={data.social_image.url} /> }
                { data.social_image && data.social_image_height && <meta property="og:image:height" content={parseInt(data.social_image_height, 10)} /> }
                { data.social_image && data.social_image_width && <meta property="og:image:width" content={parseInt(data.social_image_width, 10)} /> }
                { data.social_image && data.social_image_type && <meta property="og:image:type" content={data.social_image_type}/> }
                { data.social_image && (data.social_image_alt_text || data.social_image.alt) && <meta property="og:image:alt" content={data.social_image.alt || data.social_image_alt_text} /> }
                <meta name="twitter:card" content="summary_large_image" />
                { data.social_title && <meta name="twitter:title" content={data.social_title} /> }
                { data.social_description && <meta name="twitter:description" content={data.social_description} /> }
                { data.social_image && data.social_image.url && <meta name="twitter:image" content={data.social_image.url} /> }
                { data.social_image && (data.social_image_alt_text || data.social_image.alt) && <meta name="twitter:image:alt" content={data.social_image.alt || data.social_image_alt_text} /> }
            </Head>
        );
    }

}
