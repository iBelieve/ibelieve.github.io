import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const DefaultHeadMeta = (props, { metadata: { pkg } }) => (
  <div hidden>
    <Helmet
      meta={ [
        {
          name: 'generator', content: `${
          process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
        },
        { property: 'og:site_name', content: pkg.title },
        { name: 'twitter:site', content: `@${ pkg.twitter }` },
        ...props.meta ? props.meta : [],
      ] }
      script={ [
        { src: 'https://cdn.polyfill.io/v2/polyfill.min.js' },
        {
          'type': 'text/javascript',
          'innerHTML': `
            var _gauges = _gauges || [];
            (function() {
              var t   = document.createElement('script');
              t.type  = 'text/javascript';
              t.async = true;
              t.id    = 'gauges-tracker';
              t.setAttribute('data-site-id', '5873e920c88d90142408ba3e');
              t.setAttribute('data-track-path', 'https://track.gaug.es/track.gif');
              t.src = 'https://d36ee2fcip1434.cloudfront.net/track.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(t, s);
            })();
          `
        },
        ...props.scripts ? props.scripts : [],
      ] }
    />

    { /* meta viewport safari/chrome/edge */ }
    <Helmet
      meta={ [ {
        name: 'viewport', content: 'width=device-width, initial-scale=1',
      } ] }
    />
    <style>{ '@-ms-viewport { width: device-width; }' }</style>
  </div>
)

DefaultHeadMeta.propTypes = {
  meta: React.PropTypes.arrayOf(React.PropTypes.object),
  scripts: React.PropTypes.arrayOf(React.PropTypes.object),
}

DefaultHeadMeta.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default DefaultHeadMeta
