import React, { Component } from 'react';
import PortfolioLanding from '../../Modules/Pages/PortfolioPage/PortfolioPage';
import { PRISMIC_CONFIG } from '../../config/prismic';
import { withRouter } from 'next/router';

class PortfolioContainer extends Component {

    static async getInitialProps(context) {
        const fetchCompanyData = async (context, prismic, pageData) => {
            const { req } = context;
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

            return { companiesData:  matchedCompanies };

        };

        return PortfolioLanding.getInitialProps(context, PRISMIC_CONFIG.DOC_TYPES.PORTFOLIO, fetchCompanyData);
    }

    render() {
        return  <PortfolioLanding { ...this.props } />;
    }
}

export default withRouter(PortfolioContainer);