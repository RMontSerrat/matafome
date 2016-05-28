import React from 'react';
import Header from './header';
import Generic from './model';
import Ticket from './ticket';
import fetch from 'isomorphic-fetch';
import isEmpty from 'lodash/isEmpty';

export default class Search extends Generic {
    constructor(props, context) {
        super(props);
        this.state = {
            crd: this.getCoords()
        }
    };

    componentDidMount() {
        this.fetchData();
        this.resetColor();
    };

    setCoordinates() {
        var options = {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 600000
        };

        navigator.geolocation.getCurrentPosition(this.successSetCoordinates.bind(this), this.errorSetCoordinates.bind(this), options);
    };

    successSetCoordinates(pos) {
        var crd = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        };

        localStorage.setItem('crd', JSON.stringify(crd));
        this.setState({crd: crd}, function() {
            this.fetchData();
        });
    };

    errorSetCoordinates() {
        this.context.router.push({ pathname: '/search/error'});
    };

    getLocation() {
        if (!isEmpty(this.props.location.query)) {
            return {   
                latitude: this.props.location.query.lat, 
                longitude: this.props.location.query.lon
            }
        }
        
        return this.state.crd;
    };

    fetchData() {
        var that = this;
        var crd = this.getLocation();

        if (!crd) {
            this.setCoordinates();
            return;
        }

        var url = HOST + '?lat=' + crd.latitude + '&lon=' + crd.longitude;
        
        fetch(url)
        .then(function(response) {
            if (response.status >= 400) {
                that.context.router.push({pathname: '/serverError'})
            }
            return response.json();
        }, function(err) {
            console.log(err);
            that.context.router.push({pathname: '/serverError'})
        })
        .then(function(data) {
            that.renderMode(crd, data);
        })
    };

    renderMode(crd, data) {
        if (data.total >= 1) {
            this.context.router.push({ pathname: '/list', search: '?lat=' + crd.latitude + '&lon=' + crd.longitude, state: {data: data} });
        } else {
            this.context.router.push({ pathname:'/empty' });
        }
    };

    render() {
        return (
            <div className="search">
                <Header />
                <h2 className="loading">
                    <span>procurando podrões bem, bem gordurosos</span>
                </h2>
            </div>
        )
    };
};

export class ErrorSearch extends Generic {
    constructor(props, context) {
        super(props);
    };

    componentDidMount() {
        this.bindAutoComplete();
        this.invertColor();
    };

    bindAutoComplete() {
        var that = this;
        var input = document.querySelector("input[name='vicinity']");
        var autocomplete = new google.maps.places.Autocomplete(input);
        
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            var address = input.value;
            
            if (!place.geometry) {
                return;
            }
            
            var crd = {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            };

            localStorage.setItem('address', JSON.stringify(address));
            localStorage.setItem('crd', JSON.stringify(crd));

            that.context.router.push({ pathname: '/search', search: '?lat=' + crd.latitude + '&lon=' + crd.longitude, state: {} });
        });
    };

    render() {
        return (
         <div className="feedback">
            <Header />
            <Ticket array={TICKET.bad} />
            <h2>
               <span>deu ruim, não te achamos. onde vc tá?</span>
            </h2>
            <form>
                <input type="text" name="vicinity" placeholder="escreva aqui" />
            </form>
         </div>
        )
    }
};