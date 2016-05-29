import React from 'react';
import Header from './header';
import {Invert} from './model';
import { Link } from 'react-router';
import {ErrorBar, Ticket} from './components';

export default class Empty extends Invert {
    render() {
        return (
             <div className="feedback">
                <Header />
                <Ticket array={TICKET.bad} />
                <h2>
                    <span>não achamos nenhum perto de você :(</span>
                    <Link to="/new">
                      <button>adicionar podrão</button>
                    </Link>
                    <ErrorBar>
                        <span> / </span>
                        <Link to="/search">tentar de novo</Link>
                    </ErrorBar>
                </h2>
             </div>
      )
    };
};