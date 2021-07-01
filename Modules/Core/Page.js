import React, { Component } from 'react';
import PrismicIO from './Prismic';
import MainLayout from '../Layout/MainLayout/MainLayout';
import { withRouter } from 'next/router';

const Page = (ContentComponent) => {
    return class P extends Component {

        static async getInitialProps(context, pageType, additionalDataFetch, slug = '') {
            try {
                const prismic = new PrismicIO({});
                const { headerData, footerData, bannerData, pageData } = await prismic.getInitialProps(context, pageType, slug);

                // Check if an additional data fetch function was passed.
                let additionalProps = {};
                if (typeof additionalDataFetch === 'function') {
                    const additionalData = await additionalDataFetch(context, prismic, pageData);
                    additionalProps = {...additionalData}
                }

                return {
                    headerData: headerData[0],
                    footerData: footerData[0],
                    bannerData: bannerData[0],
                    pageData: slug ? pageData : pageData[0], // If we have a slug assume we only have a single document, otherwise take the first
                    query: context.query,
                    ...additionalProps
                };

            } catch (e) {
                throw new Error(e);
            }
        }

        render() {
            const { noLayout, headerData, footerData, bannerData, pageData } = this.props;

            if (noLayout) {
                return <ContentComponent {...this.props}/>;
            } else {
                return (
                    <MainLayout headerData={headerData} footerData={footerData} bannerData={ bannerData } pageData={pageData}>
                        <ContentComponent {...this.props}/>
                    </MainLayout>
                );
            }
        }
    }
};

export default Page;
