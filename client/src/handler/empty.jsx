import React from 'react';
import Header from './header';
import Generic from './model';
import Ticket from './ticket';
import { Link } from 'react-router';

export default class Empty extends Generic {
    componentDidMount() {
        this.invertColor();
    };

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
            </h2>
         </div>
      )
    };
};