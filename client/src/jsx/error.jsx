import rp from 'request-promise';
import React from 'react';
import Generic from './model';
import Header from './header';
import {TicketBad} from './ticket';

class Error extends Generic {
    componentDidMount() {
        initMap();
        this.bindSubmit();
        this.setColor();
    };

    bindSubmit() {
        var that = this;

        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();

            var endereco = document.querySelector('input[name="vicinity"').value;
            that.getLocationByAddress(endereco, that.successLocation.bind(this)); 
        });
    };

    successLocation() {
        var that = this,
            crd = this.state.crd,
            url = 'https://matafome-api.herokuapp.com/';

        request({
            url: url,
            data: crd,
            method: 'GET'
        }, function(err, response, data) {
            that.setState({
                data: JSON.parse(data)
            });
            localStorage.setItem('data', JSON.stringify(that.state.data));
            that.getCurrentAddress(that.renderMode);
        });
    };

    render() {
        return (
         <div className="feedback">
            <Header />
            <TicketBad />
            <h2>
               <span>deu ruim, não te achamos. onde vc tá?</span>
            </h2>
            <form>
                <input type="text" name="vicinity" placeholder="escreva aqui" />
                <input type="submit" style={{visibility: 'hidden'}} />
            </form>
         </div>
        )
    }
};

export default Error;