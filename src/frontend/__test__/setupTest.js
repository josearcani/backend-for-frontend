// eslint-disable-next-line import/no-extraneous-dependencies
import Enzyme from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
