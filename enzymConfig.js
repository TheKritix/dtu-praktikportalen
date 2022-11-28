//source: https://www.npmjs.com/package/@zarconontol/enzyme-adapter-react-18

import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });