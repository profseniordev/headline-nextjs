import React, { Component } from 'react';
import Page from '../../Core/Page';
import Homepage from '../../Components/Homepage/Homepage';
import { withRouter } from 'next/router';

class Home extends Component {

    render() {
        const { pageData: { data }, portfolioData, companiesData, pageType, query } = this.props;

        return (
            <Homepage data={ data } pageType={ pageType } portfolioData={ portfolioData } companiesData={ companiesData }/>
        );
    }
}

const HomePage = Page(Home);

export default HomePage;
