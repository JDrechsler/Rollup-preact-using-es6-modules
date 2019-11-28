import { h, render, Component } from 'preact';
import Router, { Route } from 'preact-router';
import { Suspense, lazy } from 'preact/compat';
import { Home } from './pages/Home.js';
import { NavBar } from './components/navbar.js';

const LazyPage = lazy(() => import('./pages/Lazy.js'));
const LazyPizzaPage = lazy(() => import('./pages/Pizza.js'));
const LazyTestPage = lazy(() => import('./pages/Test.js'));
const LazyAIPage = lazy(() => import('./pages/AI.js'));
const NotFound = () => (
  <section>
    <h2>Not Found</h2>
  </section>
);

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Suspense fallback={<div></div>}>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/pizza" component={LazyPizzaPage} />
            <Route path="/test" component={LazyTestPage} />
            <Route path="/lazy" component={LazyPage} />
            <Route path="/ai" component={LazyAIPage} />
            <Route default component={NotFound} />
          </Router>
        </Suspense>
      </div>
    );
  }
}

render(<App />, document.body);
