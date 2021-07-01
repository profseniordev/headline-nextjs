import React, { Component } from 'react';
import HomePage from '../Modules/Pages/HomePage/HomePage';
import { PRISMIC_CONFIG } from '../config/prismic';
import { withRouter } from 'next/router';

class HomeContainer extends Component {

    static async getInitialProps(context) {
        const fetchPortfolioData = async (context, prismic, pageData) => {
            const { req } = context;
            const id = pageData[0].data.mobile_page_data.id;
            const data = await prismic.queryById(req, id);

            const companyIds = pageData[0].data.company.map(item => item.company_url.id);
            const companiesFirstBatch = await prismic.queryByType(req, PRISMIC_CONFIG.DOC_TYPES.COMPANY, true);
            const companiesById = {};
            let totalPages = companiesFirstBatch.total_pages;
            let allCompanyData = [...companiesFirstBatch.results];
            let matchedCompanies;

            if (totalPages > 1) {
                let currentPage = 2;
                const fetchRemainingCompanies = [];

                while (currentPage <= totalPages) {
                    fetchRemainingCompanies.push(new Promise((res, rej) => {
                        try {
                            res(prismic.queryByType(req, PRISMIC_CONFIG.DOC_TYPES.COMPANY, true, currentPage))
                        } catch(error) {
                            rej(error);
                        }
                    }))
                    currentPage++;
                }

                const remainingCompanyResults = await Promise.all(fetchRemainingCompanies);
                const batch = remainingCompanyResults.map((page) => page.results ).flat();
                allCompanyData = [...allCompanyData, ...batch];
            }

            allCompanyData.map((company) => {
                companiesById[`${ company.id }`] = company;
            })

            matchedCompanies = companyIds.map((companyId) => companiesById[companyId]);

            return { portfolioData: data, companiesData: matchedCompanies };
        };

        return HomePage.getInitialProps(context, PRISMIC_CONFIG.DOC_TYPES.HOMEPAGE, fetchPortfolioData);
    }

  render() {
    return  <HomePage { ...this.props } />;
  }
}

export default withRouter(HomeContainer);

