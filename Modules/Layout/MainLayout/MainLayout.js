import React from 'react';
import Head from 'next/head';
import GlobalHeader from '../GlobalHeader/GlobalHeader';
import GlobalFooter from '../GlobalFooter/GlobalFooter';
import { PRISMIC_CONFIG } from '../../../config/prismic';
import MetaTags from '../MetaTags';
import '../../Core/Styles/index.scss';
import './main-layout.scss';
import BottomMobileMenu from '../../Components/Navigation/BottomMobileMenu/BottomMobileMenu';
import GoogleTagManager from '../../Components/GoogleTagManager/GoogleTagManager';
import BannerWithButton from '../../Components/BannerWithButton/BannerWithButton';

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cookiesAccepted: null,
            consentKey: '_HEADLINE_USER_CONSENT'
        };
    }

    componentDidMount() {
        this.updateConsentState();
    }

    updateConsentState = () => {
        this.setState({ cookiesAccepted: this.getConsent(this.state.consentKey) });
    }

    setConsent = () => {
        const now = new Date();
        const CONSENT_EXPIRY = 604800017;

        const item = {
            value: true,
            expiry: now.getTime() + CONSENT_EXPIRY,
        };

        if (typeof window !== "undefined") {
            localStorage.setItem(this.state.consentKey, JSON.stringify(item));
            this.updateConsentState();
        }
    }

    getConsent = key => {
        if (typeof window !== "undefined") {
            const str = localStorage.getItem(key);

            if (!str) {
                return false;
            }

            const item = JSON.parse(str);
            const now = new Date();

            if (now.getTime() > item.expiry) {
                    localStorage.removeItem(key);
                return false;
            }

            return true;
        }
    }

    render() {
        const { children, pageData, isArticle, headerData, footerData, bannerData } = this.props;
        const pageType = pageData.type;
        const { google_tag_manager_tag: gtmTag, enable_google_tag_manager: enableGtm } = headerData.data;

        return (
            <div className="c-main-layout">
                <div id="body-inner">
                    { pageData && <MetaTags pageData={ pageData } /> }
                    <Head>
                        { /* This script tag is required for Prismic Preview */ }
                        <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${ PRISMIC_CONFIG.REPO}&new=true` }> </script>
                        { pageType === 'portfolio' && '<link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />' }
                        <link rel="shortcut icon" href="/static/favicon.ico"/>
                        <GoogleTagManager tag={ gtmTag } enabled={ enableGtm && this.state.cookiesAccepted === true } />
                    </Head>
                    <div id="layout-wrapper">
                        <GlobalHeader data={ headerData.data } pageType={ pageType }/>
                            <main id="main">
                                { children }
                            </main>

                        <GlobalFooter data={ footerData.data } pageType={ pageType } cookiesAccepted={ this.state.cookiesAccepted }/>
                        <BottomMobileMenu links={ headerData.data.bottom_nav_links } pageType={ pageType === 'homepage' ? 'portfolio' : pageType }/>
                        { bannerData.data.is_visible && this.state.cookiesAccepted === false && <BannerWithButton text={ bannerData.data.banner_text } buttonText={ bannerData.data.button_text } clickMethod={ () => this.setConsent() }/> }
                    </div>
                </div>
            </div>
        );
    }
}
