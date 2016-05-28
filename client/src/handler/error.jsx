import React from 'react';
import Generic from './model';
import Header from './header';
import Ticket from './ticket';
import { Link } from 'react-router';

export default class ServerError extends Generic {
    componentDidMount() {
        this.invertColor();
    };

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
         </div>
        )
    }
};