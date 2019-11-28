import { Component, h } from 'preact';

export class Home extends Component {
  componentDidMount() {
    console.log('Home did mount');
  }

  render() {
    return (
      <section>
        <h2>Home</h2>
      </section>
    );
  }
}
