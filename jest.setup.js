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