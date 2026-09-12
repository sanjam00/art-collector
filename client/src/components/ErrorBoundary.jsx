import { Component } from "react";

// prevents app from crashing during uncaught errors or render errors
export class ErrorBoundary extends Component{
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error })
    console.error("Caught by ErrorBoundary:", error, info);
  }

  // add bootstap alert error handling
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>Reload page</button>
        </div>
      );
    }
    return this.props.children;
  }
}