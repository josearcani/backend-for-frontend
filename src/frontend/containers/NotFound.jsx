import React from 'react';

import '../assets/styles/components/NotFound.scss';

const NotFound = () => (
  <>
    <aside>
      <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png' alt='message of page not found' />
    </aside>
    <main>
      <h1>Sorry!</h1>
      <p>
        Either you aren&apos;t cool enough to visit this page or it doesn&apos;t exist
        {' '}
        <em>. . . like your social life.</em>
      </p>
      <button type='button'>You can go now!</button>
    </main>
  </>
);

export default NotFound;
