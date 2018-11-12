import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {axe, toHaveNoViolations} from 'jest-axe';
import {prettyDOM} from 'dom-testing-library';
import { render, cleanup } from 'react-testing-library';
import Link from '../Link';

expect.extend(toHaveNoViolations);

const config = {
  rules: {
    'color-contrast': { enabled: false },
    'link-in-text-block': { enabled: false }
  }
};

async function testAccessibility(element) {

  const body = prettyDOM(document.body);
  console.log(`body is: ${body}`);
  const results = await axe(body, config);
  return results;
}

afterEach(cleanup);

test('has no aXe violations', async () => {
  const instance = render(
    <Link>aXe website</Link>
  );
  const results = await testAccessibility(instance);
  expect(results).toHaveNoViolations();
});

test('another test', async () => {
  expect(await axe(`<img src="#"/>`)).toHaveNoViolations();
});
