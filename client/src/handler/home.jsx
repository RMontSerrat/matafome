import React from 'react';
import { Link } from 'react-router';
import {Default} from './model';

export default class Home extends Default {
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