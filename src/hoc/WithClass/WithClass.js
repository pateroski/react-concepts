import React from 'react';

const withClass = (WrappedComponent, className) => {

  return (props) => (
    <article className={className}>
      <WrappedComponent {...props} />
    </article>
  )
}

export default withClass;