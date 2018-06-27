// Core
import React from 'react';
import dom from 'react-test-renderer';

// Components
import Counter from './Counter';

const tree = dom.create(<Counter count = { 3 } />).toJSON();

test('Counter component should correspond to their snapshot', () => {
    expect(tree).toMatchSnapshot();
});
