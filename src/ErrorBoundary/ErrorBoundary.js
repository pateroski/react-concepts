import React, { Component } from 'react';

/**
 * Error boundary component wrappers are useful when you know you have other
 * components that has code that may fail and you can't control it.
 *
 * Important: in develop mode, you would not get the behavior introduced by
 * errorBoundary, e.g, return elements displaying the error etc. Only in
 * production mode the behavior will be shown.
 */
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  }

  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true,
      errorMessage: error
    })
  }

  render() {
      if (this.state.hasError) {
        return <h1>{this.state.errorMessage}</h1>
      } else {
        return this.props.children
      }
  }
}

export default ErrorBoundary;