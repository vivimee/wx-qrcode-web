import Container from '../containers/indexContainer/index';
import render from '../utils/render';

render(Container);

if (module.hot) {
  module.hot.accept('../containers/indexContainer/index', () => {
    const NewContainer = require('../containers/indexContainer/index')
      .default;
    render(NewContainer);
  });
}
