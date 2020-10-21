import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import previewImage from '../../assets/image-preview.png';

Head.propTypes = {
  children: PropTypes.object,
};

export default function Head({ children }) {
  const title = 'wunderlist';
  const description = 'Find, share, and save your new favorite place.';
  const currentURL = 'https://wunderlist.me/';

  return (
    <Helmet>
      {/* <!-- Primary Meta Tags --> */}
      {children}
      <meta name='title' content={title} />
      <meta name='description' content={description} />
      <meta name='image' content={`${currentURL}${previewImage}`} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={currentURL} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={`${currentURL}${previewImage}`} />

      {/* <!-- Twitter --> */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={currentURL} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={`${currentURL}${previewImage}`} />
    </Helmet>
  );
}
