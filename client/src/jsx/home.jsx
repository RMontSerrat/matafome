import React from 'react';
import { Link } from 'react-router';
import Generic from './model';

class Home extends Generic {
    render() {
        return (
            <div className="home">
                <div className="bg"></div>
                <div className="content">
                    <img src="../../src/img/foto_burger-01.png" />
                    <div className="actions">
                        <Link to="/search"><button>buscar podrão</button></Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;