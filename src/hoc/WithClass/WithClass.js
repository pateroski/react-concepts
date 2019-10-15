import React from 'react';

const withClass = props => (
  <article className={props.classes}>
    {props.children}
  </article>
)

export default withClass;