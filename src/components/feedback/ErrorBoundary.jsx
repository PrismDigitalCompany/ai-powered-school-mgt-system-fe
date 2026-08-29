import { Component } from "react";
import ErrorContent from "../../errors/ErrorContent";


export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled component error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorContent
            status={500}
            title="Something went wrong"
            description="An unexpected error occurred. Please reload the page."
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
