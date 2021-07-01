import React, { Component } from 'react';
import Legal from '../../Modules/Pages/LegalPage/LegalPage';
import { PRISMIC_CONFIG } from '../../config/prismic';

export default class LegalContainer extends Component {

    static async getInitialProps(context) {
        return Legal.getInitialProps(context, PRISMIC_CONFIG.DOC_TYPES.LEGAL, null, context.query.slug);
    }

    render() {
        return  <Legal { ...this.props } />;
    }
}