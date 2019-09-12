import Container from '../containers/userContainer/index';
import render from '../utils/render';

render(Container);

if (module.hot) {
  module.hot.accept('../containers/userContainer/index', () => {
    const NewContainer = require('../containers/userContainer/index').default;
    render(NewContainer);
  });
}
