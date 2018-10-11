import React from 'react';
import { mount } from 'enzyme';

import Link from '../Link';

test('no aXe violations', async () => {
  const instance = mount(<Link page="http://www.axe-core.org">aXe website</Link>);
  const results = await instance.axe();
  expect(results.violations).toHaveLength(0);
});
