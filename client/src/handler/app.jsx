import React from 'react';
import { render } from 'react';
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router'
import Home from './home';
import Search, {ErrorSearch} from './search';
import List, {EndList} from './list';
import New, {ErrorNew, SuccessNew} from './new';
import Empty from './empty';
import { createHashHistory } from 'history'
import ServerError from './error'

const history = useRouterHistory(createHashHistory)();

render((
  <Router history={history}>
    <Route path="/">
        <IndexRoute component={Home} />
        <Route path="list">
            <IndexRoute component={List} />
            <Route path="end" component={EndList} />
        </Route>
        <Route path="new">
            <IndexRoute component={New} />
            <Route path="error" component={ErrorNew} />
            <Route path="success" component={SuccessNew} />
        </Route>
        <Route path="search">
            <IndexRoute component={Search} />
            <Route path="error" component={ErrorSearch} />
        </Route>
    </Route>
    <Route path="serverError" component={ServerError} />
    <Route path="*" component={Empty} />
  </Router>
),   document.getElementById('container'))
