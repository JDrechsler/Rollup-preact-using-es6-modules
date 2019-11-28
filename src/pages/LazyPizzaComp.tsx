import { Component, h } from 'preact';
import { customStore } from './../store/customStore.js';
import { view } from 'z-preact-easy-state';

class LazyPizzaComp extends Component {
  btnClick() {
    console.log('Click');
    customStore.btnClicked += 1;
  }

  render() {
    return (
      <section>
        <h2>LAZYYY Pizza</h2>
        <button onClick={this.btnClick}>Click me</button>
        <p>Button clicked: {customStore.btnClicked}</p>
      </section>
    );
  }
}

export default view(LazyPizzaComp);
