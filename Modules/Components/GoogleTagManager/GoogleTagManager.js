import React from 'react';

export default class GoogleTagManager extends React.Component {

    render () {
        const { tag, enabled } = this.props;
        // eslint-disable-next-line no-undef
        const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
        const scriptInclude = <script key={'gtm-include-1'} async src={`https://www.googletagmanager.com/gtag/js?id=${ tag }`}> </script>;
        const runtime = (
            <script
                key={'gtm-include-2'}
                dangerouslySetInnerHTML={{ __html: `
              if (typeof window !== 'undefined') {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${ tag }');
                }
            ` }} />);

        return isProduction || enabled ? [scriptInclude, runtime] : [<script></script>];
    }
}