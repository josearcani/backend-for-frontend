import React from 'react';
import { mount } from 'enzyme';
import ProviderMock from '../../__mocks__/ProviderMock';

import Login from '../../containers/Login';

describe('<Login />', () => {
  test('Login form', () => {
    const preventDefault = jest.fn();
    // jest.fn() es un mock para trabajar con funciones
    const login = mount(<ProviderMock><Login /></ProviderMock>);
    login.find('form').simulate('submit', { preventDefault });
    // simulamos un submit al formulario
    expect(preventDefault).toHaveBeenCalledTimes(1);
    // solo debe ser llamado una vez
    login.unmount();
    // debemos desmontarlo
  });
});
