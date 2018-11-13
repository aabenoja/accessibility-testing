import React from 'react';
import axe from 'axe-core';
import { toHaveNoViolations } from 'jest-axe';
import ReactDOMServer from 'react-dom/server';
import { render, cleanup, prettyDOM } from 'react-testing-library';
import Link from '../Link';

expect.extend(toHaveNoViolations);

const config = {
  rules: {
    'color-contrast': { enabled: false },
    'link-in-text-block': { enabled: false }
  }
};

async function testAccessibility(container) {
  const body = prettyDOM(container.innerHTML);
  const results = await axe(body, config);
  return results;
}

const Img = props => <img {...props} />;
const runAxe = () => new Promise((resolve, reject) => {
  axe.run(document.body, config, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

beforeEach(cleanup);

afterEach(async () => {
  const results = await runAxe();
  expect(results).toHaveNoViolations();
});

test('has no aXe violations', () => {
  const {container} = render(
    <Link>aXe website</Link>
  );
});

test('another test', () => {
  const {container} = render(<Img src="#"/>);
});
