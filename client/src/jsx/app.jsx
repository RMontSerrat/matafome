import React from 'react';
import { render } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from './home';
import Search from './search';
import List from './list';
import New, {ErrorNew, SuccessNew} from './new';
import Error from './error';
import Empty from './empty';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
    </Route>
    <Route path="/list" component={List} />
    <Route path="/new" component={New} />
    <Route path="/search" component={Search} />
    <Route path="/error" component={Error} />
    <Route path="/new/error" component={ErrorNew} />
    <Route path="/new/success" component={SuccessNew} />
    <Route path="*" component={Empty} />
  </Router>
),   document.getElementById('container'))
