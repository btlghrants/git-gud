import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
Vue.use(Vuetify);

import '@testing-library/jest-dom';
import util from 'util';

// full object reporting (no depth trucation!) in console.log
// https://stackoverflow.com/questions/54725881/how-to-make-jest-log-the-entire-error-object
util.inspect.defaultOptions.depth = null;