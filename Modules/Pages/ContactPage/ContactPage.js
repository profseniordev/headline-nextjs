import React, { Component } from 'react';
import Page from '../../Core/Page';
import ContactPage from '../../Components/ContactPage/ContactPage'

class ContactContainer extends Component {

    render() {
        const { pageData: { data } } = this.props;
        return (
            <ContactPage data={ data } />
        );
    }
}

const Contact = Page(ContactContainer);

export default Contact;