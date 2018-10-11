import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enzymeMount from 'enzyme/build/mount';
import axe from 'axe-core';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
function mount(...args) {
  const instance = enzymeMount(...args);

  if (!document) {
    global.document = jsdom(`<!DOCTYPE html><html><body></body></html>`);
  }
  if (!wrapper) {
    wrapper = document.createElement('main');
    document.body.appendChild(wrapper);
  }

  wrapper.innerHtml = '';
  wrapper.appendChild(instance.getDOMNode());

  const config = {
    rules: {
      'color-contrast': { enabled: false }
    }
  };

  instance.axe = () => new Promise((resolve, reject) => {
    axe.run(instance.getDOMNode(), config, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
  return instance;
}

Enzyme.mount = mount;
