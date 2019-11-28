import { h, Component } from 'preact';
import { view } from 'z-preact-easy-state';
import { customStore } from '@store/customStore';

class Test extends Component {
  render() {
    return (
      <section>
        <h2>Test</h2>
        <p>Hello {customStore.name}</p>
        <p>Your favorite food is: {customStore.favFood}</p>
        <p>Button clicked: {customStore.btnClicked}</p>
      </section>
    );
  }
}

export default view(Test);
