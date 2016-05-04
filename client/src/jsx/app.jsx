import React from 'react';
import { render } from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'
import Home from './home';
import Search from './search';
import List from './list';
import New, {ErrorNew, SuccessNew} from './new';
import Error from './error';
import Empty from './empty';

render((
  <Router history={hashHistory}>
    <Route path="/">
        <IndexRoute component={Home} />
        <Route path="list" component={List} /> 
        <Route path="new">
            <IndexRoute component={New} />
            <Route path="error" component={ErrorNew} />
            <Route path="success" component={SuccessNew} />
        </Route>
        <Route path="search" component={Search} />
        <Route path="error" component={Error} />
    </Route>
    <Route path="*" component={Empty} />
  </Router>
),   document.getElementById('container'))
