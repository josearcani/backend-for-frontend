import {
  setFavorite,
  deleteFavorite,
  loginRequest,
  logoutRequest,
} from '../../actions';
import movieMock from '../../__mocks__/movieMock';

describe('Actions', () => {
  test('set favotite', () => {
    const payload = movieMock;
    const expectedAction = {
      type: 'SET_FAVORITE',
      payload,
    };
    expect(setFavorite(payload)).toEqual(expectedAction);
  });

  test('delete favotite', () => {
    const payload = 'id';
    const expectedAction = {
      type: 'DELETE_FAVORITE',
      payload,
    };
    expect(deleteFavorite(payload)).toEqual(expectedAction);
  });

  test('login', () => {
    const payload = {
      email: 'jose@undefined.sh',
      password: 'password',
    };
    const expectedAction = {
      type: 'LOGIN_REQUEST',
      payload,
    };
    expect(loginRequest(payload)).toEqual(expectedAction);
  });

  test('logout', () => {
    const payload = {};
    const expectedAction = {
      type: 'LOGOUT_REQUEST',
      payload,
    };
    expect(logoutRequest(payload)).toEqual(expectedAction);
  });
});

