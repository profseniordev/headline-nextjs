import React, { Component } from 'react';
import Page from '../../Core/Page';

class CompanyPage extends Component {

    render() {
        const { pageData: { data } } = this.props;

        return (
            <div>
                { data.page_title[0].text }
            </div>
        );
    }
}

const Company = Page(CompanyPage);

export default Company;