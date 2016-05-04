import request from 'request';
import React from 'react';
import Generic from './model';
import Header from './header';
import {TicketBad} from './ticket';
import { hashHistory } from 'react-router';

class Error extends Generic {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        initMap();
        this.bindSubmit();
        this.invertColor();
    };

    bindSubmit() {
        var that = this;

        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();

            var address = document.querySelector('input[name="vicinity"').value;

            localStorage.setItem('address', JSON.stringify(address));
            that.getAddress(address); 
        });
    };

    getAddress(address) {
        var that = this;
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': address, 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var crd = {
                        latitude: results[0].geometry.location.lat(),
                        longitude: results[0].geometry.location.lng()
                    };

                    localStorage.setItem('crd', JSON.stringify(crd));
                    that.fetchData(crd);
                }
            }
        });
    };

    fetchData(crd) {
        var that = this;
        var url = 'https://matafome-api.herokuapp.com/?lat=' + crd.latitude + '&lon=' + crd.longitude;
        
        request.get(url, function(err, response, data) {
            localStorage.setItem('data', data);
            that.renderMode(JSON.parse(data));
        });
    };

    renderMode(data) {
        if (data.total >= 1) {
            hashHistory.push('/list');
        } else {
            hashHistory.push('/empty');
        }
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
                <input type="submit" value="pronto!" />
            </form>
         </div>
        )
    }
};

export default Error;