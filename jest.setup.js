import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import store from '@/store';
import util from 'util';

// full object reporting (no depth trucation!) in console.log
// https://stackoverflow.com/questions/54725881/how-to-make-jest-log-the-entire-error-object
util.inspect.defaultOptions.depth = null;

// https://github.com/testing-library/vue-testing-library#more-examples
// https://github.com/testing-library/vue-testing-library/blob/master/src/__tests__/vuetify.js
global.doRender = (component, options, callback) => {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')

  return render(
    component,
    {
      container: document.body.appendChild(root),
      vuetify,
      router,
      store,
      ...options,
    },
    callback
  )
}

// https://github.com/testing-library/vue-testing-library/blob/master/src/__tests__/vuex.js
// to pass per-test values to store, consider 2 step init:
// - { vuetify, router, store, component, options, callback, render } = testHarness(component)
// - store = {...store, ...overrides};
// - render({store})

global.fetch = jest.fn(() => Promise.resolve());
