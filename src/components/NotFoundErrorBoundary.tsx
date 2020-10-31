import React, { Component } from "react";

export const createErrorBoundary = (component: React.ReactNode) =>
  class NotFoundErrorBoundary extends Component<{}, { error: Error | null }> {
    constructor(props) {
      super(props);
      this.state = {
        error: null
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
        return <>{component}</>;
      }
      return this.props.children;
    }
  };
