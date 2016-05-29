import React from 'react';
import {Invert} from './model';
import Header from './header';
import { Link } from 'react-router';
import {ErrorBar, Ticket} from './components';

export default class ServerError extends Invert {
    render() {
        return (
         <div className="feedback">
            <Header />
            <Ticket array={TICKET.bad} />
            <h2>
               <span>deu ruim, erro no servidor. Tenta de novo!</span>
            </h2>
            <Link to="/search">
                <button>explorar podrões</button>
            </Link>
            <ErrorBar />
         </div>
        )
    }
};