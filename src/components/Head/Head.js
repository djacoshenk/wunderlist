import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

Head.propTypes = {
  children: PropTypes.object,
};

export default function Head({ children }) {
  const title = 'wunderlist';
  const description = 'Find, share, and save your new favorite place.';
  const currentURL = 'https://wunderlist.me/';
  const previewImage =
    'https://d33wubrfki0l68.cloudfront.net/5f909ba9aed798000778b5ac/screenshot.png';

  return (
    <Helmet>
      {/* <!-- Primary Meta Tags --> */}
      {children}
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={currentURL} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={previewImage} />

      {/* <!-- Twitter --> */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={currentURL} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={previewImage} />
    </Helmet>
  );
}
