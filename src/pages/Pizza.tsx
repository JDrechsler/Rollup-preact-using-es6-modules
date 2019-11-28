import { Component, h } from 'preact';
import { Suspense, lazy } from 'preact/compat';
import { view } from 'z-preact-easy-state';

const LazyPizzaComp = lazy(() => import('@components/LazyPizzaComp'));

class Pizza extends Component {
  render() {
    return (
      <section>
        <h2>Pizza</h2>

        <Suspense fallback={<div>Loading...</div>}>
          <LazyPizzaComp />
        </Suspense>
      </section>
    );
  }
}

export default view(Pizza);
