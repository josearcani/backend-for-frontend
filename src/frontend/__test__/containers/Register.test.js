import React from 'react';
import { mount } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';

import Register from '../../containers/Register';

describe('<Register />', () => {
  test('Register form', () => {
    const preventDefault = jest.fn();
    // jest.fn() es un mock para trabajar con funciones
    const register = mount(<ProviderMock><Register /></ProviderMock>);
    register.find('form').simulate('submit', { preventDefault });
    // simulamos un submit al formulario
    expect(preventDefault).toHaveBeenCalledTimes(1);
    // solo debe ser llamado una vez
    register.unmount();
    // debemos desmontarlo
  });
});
