import riot from 'riot';
import reduxMixin from 'riot-redux-mixin';

import store from './store';

import './components/console-list.tag';
import './components/app-container.tag';

riot.mixin('redux', reduxMixin(store));
riot.mount('*', {});
