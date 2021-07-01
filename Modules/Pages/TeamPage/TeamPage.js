import React, { Component } from 'react';
import Page from '../../Core/Page';
import Team from '../../Components/Team/Team';
import { withRouter } from 'next/router';

class TeamPage extends Component {

    render() {
        const { pageData: { data }, partnersData, query } = this.props;

        return (
            <Team data={ data } partnersData={ partnersData } query={ query } />
        );
    }
}

const TeamLanding = Page(TeamPage);

export default TeamLanding;