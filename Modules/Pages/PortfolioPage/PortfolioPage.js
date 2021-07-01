import React, { Component } from 'react';
import Page from '../../Core/Page';
import Portfolio from "../../Components/Portfolio/Portfolio";
import { withRouter } from 'next/router';

class PortfolioPage extends Component {

    render() {
        const { pageData: { data }, companiesData, query } = this.props;

        return (
            <Portfolio data={ data } companiesData={ companiesData } query={ query } />
        );
    }
}

const PortfolioLanding = Page(PortfolioPage);

export default PortfolioLanding;