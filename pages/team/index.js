import React, { Component } from 'react';
import TeamLanding from '../../Modules/Pages/TeamPage/TeamPage';
import { PRISMIC_CONFIG } from '../../config/prismic';
import { withRouter } from 'next/router';

class TeamContainer extends Component {

    static async getInitialProps(context) {
        const fetchPartnerData = async (context, prismic, pageData) => {
            const { req } = context;
            const partnerIds = pageData[0].data.partners.map(item => item.partner_url.id );
            const partners = await prismic.queryByIds(req, partnerIds);

            return { partnersData: partners };
        };

        return TeamLanding.getInitialProps(context, PRISMIC_CONFIG.DOC_TYPES.TEAM, fetchPartnerData);
    }

    render() {
        return  <TeamLanding { ...this.props } />;
    }
}

export default withRouter(TeamContainer);