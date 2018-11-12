import React from 'react';

export default function Link({ children, page }) {
  return <a href={page}>{children}</a>;
}
