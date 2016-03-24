import request from 'request';
import React from 'react';
import Header from './header';

class Error extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        initMap();
        this.bindSubmit();
    };

    bindSubmit() {
        var that = this;

        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();

            var endereco = document.querySelector('input[name="vicinity"').value;
            var geocoder = new google.maps.Geocoder();
            
            geocoder.geocode({ 'address': endereco, 'region': 'BR' }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var crd = {
                            latitude: results[0].geometry.location.lat(),
                            longitude: results[0].geometry.location.lng()
                        };

                        that.successLocation(crd);
                    }
                }
            });
        });
    };

    renderMode(data, crd) {
        console.log(data);
        if (data.podroes.length > 1) {
            this.props.updateMode('list', data, crd);
        } else {
            this.props.updateMode('empty');
        }
    };
    
    successLocation(pos) {
        var that = this,
            crd = pos.coords,
            url = 'http://localhost:5000/',
            data = {
              lat: crd.latitude,
              lon: crd.longitude
            };

        request.get(url, data, function(req, resp) {
            var response = JSON.parse(resp.body);
            that.renderMode(response, crd)
        });
    };

    render() {
        return (
         <div className="search">
            <Header updateMode={this.props.updateMode} mode={this.props.mode} />
            <h2 className="loading">
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