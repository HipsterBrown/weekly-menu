import React, { Component } from "react";
import { Text, Link } from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";

export class SessionError extends Error {
  name = "SessionError";
  message = "Must be logged in to continue";
}

class SessionErrorBoundary extends Component<
  {},
  { sessionError: null | Error }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionError: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    if (error instanceof SessionError) {
      return { sessionError: error };
    }
    return { sessionError: null };
  }

  render() {
    if (this.state.sessionError !== null) {
      return (
        <>
          <Text>{this.state.sessionError.message}</Text>
          <Link color="teal.500" as={RouterLink} to="/login">
            Login
          </Link>
        </>
      );
    }
    return this.props.children;
  }
}

export default SessionErrorBoundary;
