import React from 'react';
import { mount } from 'enzyme';

import Footer from '../../components/Footer';

describe('<Footer />', () => {
  const footer = mount(<Footer />);
  // probamos que existe el componente
  test('Render Footer Component', () => {
    expect(footer.length).toEqual(1);
    // verificamos si existe un nodo
  });

  test('Render Has 3 anchors', () => {
    expect(footer.find('a')).toHaveLength(3);
  });
});
