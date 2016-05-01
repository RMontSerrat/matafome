import React from 'react';
import Header from './header';
import Generic from './model';
import {TicketBad} from './ticket';

class Empty extends Generic {
    render() {
      return (
         <div className="feedback">
            <Header />
            <TicketBad />
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

export default Empty;
