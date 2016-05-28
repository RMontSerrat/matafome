import React from 'react';
import { Link } from 'react-router';
import Generic from './model';

export default class Home extends Generic {
    componentDidMount() {
        this.resetColor();
        localStorage.clear();
    };
    
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