import React, { Component } from 'react';
import Page from '../../Core/Page';

class PartnerPage extends Component {

    render() {
        const { pageData: { data } } = this.props;

        return (
            <div>
                { data.page_title[0].text }
            </div>
        );
    }
}

const Partner = Page(PartnerPage);

export default Partner;