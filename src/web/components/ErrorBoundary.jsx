import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Layout Error Boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="panel fatal-error">
          <h3>Something went wrong.</h3>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload Dashboard</button>
        </section>
      );
    }

    return this.props.children;
  }
}
