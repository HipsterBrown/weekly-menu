import React, { Component, cloneElement } from "react";

export const createErrorBoundary = (component: React.ReactElement) =>
  class NotFoundErrorBoundary extends Component<
    { preview?: boolean },
    { error: Error | null }
  > {
    constructor(props: { preview?: boolean }) {
      super(props);
      this.state = {
        error: null,
      };
    }

    static getDerivedStateFromError(error: Error) {
      if (error.name === "not_found") {
        return { error };
      }
      return { error: null };
    }

    render() {
      const { error } = this.state;
      if (error !== null) {
        const { preview } = this.props;
        return <>{cloneElement(component, { preview })}</>;
      }
      return this.props.children;
    }
  };

class NotFoundErrorBoundary extends Component<
  { fallback: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { fallback: React.ReactNode }) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    if (error.name === "not_found") {
      return { error };
    }
    return { error: null };
  }

  render() {
    const { error } = this.state;
    const { fallback } = this.props;
    if (error !== null) {
      return <>{fallback}</>;
    }
    return this.props.children;
  }
}

export default NotFoundErrorBoundary;
