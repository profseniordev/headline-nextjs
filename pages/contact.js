import React, { Component } from 'react';
import Contact from '../Modules/Pages/ContactPage/ContactPage';
import { PRISMIC_CONFIG } from '../config/prismic';

export default class ContactContainer extends Component {

    static async getInitialProps(context) {
        return Contact.getInitialProps(context, PRISMIC_CONFIG.DOC_TYPES.CONTACT);
    }

    render() {
        return  <Contact { ...this.props } />;
    }
}