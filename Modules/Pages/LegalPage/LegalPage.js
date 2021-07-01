import React, { Component } from 'react';
import Page from '../../Core/Page';
import LegalTemplate from '../../Components/LegalTemplate/LegalTemplate';

class LegalPage extends Component {

    render() {
        const { pageData: { data } } = this.props;

        return (
            <LegalTemplate data={ data }/>
        );
    }
}

const Legal = Page(LegalPage);

export default Legal;