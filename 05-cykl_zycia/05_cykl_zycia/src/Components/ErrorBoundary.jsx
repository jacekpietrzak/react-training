import { Component } from "react";

// jest to komponent ktory ma tylko jedna funkcje. Wylapywac bledy, siatka bezpieczenstwa.

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    // Jeśli ta metoda została wywołana to gdzieś niżej w drzewie musiał wystąpić błąd
    // Ustanawiamy stan
    this.setState({ hasError: true });
    // Można także wysłać raport o błędzie do serwisu analitycznego
    // logErrorToMyService(error, info);
    console.log(error, info);
  }

  render() {
    // Jeżeli wystąpił błąd...
    if (this.state.hasError) {
      // Renderujemy fallback UI
      return <h1>Something went wrong :(</h1>;
    }
    // Jeśli wszystko OK, renderujemy dzieci
    return this.props.children;
  }
}

export default ErrorBoundary;
