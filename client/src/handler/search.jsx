import React from 'react';
import Header from './header';
import Generic from './model';
import {Ticket, ErrorBar} from './components';
import fetch from 'isomorphic-fetch';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router';

export default class Search extends Generic {
    constructor(props, context) {
        super(props);
        this.state = {
            crd: this.getCoords()
        }

        this.successSetCoordinates = this.successSetCoordinates.bind(this);
        this.errorSetCoordinates = this.errorSetCoordinates.bind(this);
    };

    componentDidMount() {
        this.fetchData();
        this.resetColor();
    };

    setCoords() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(this.successSetCoordinates, this.errorSetCoordinates, options);
    };

    successSetCoordinates(pos) {
        var crd = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        };

        this.setState({crd: crd}, function() {
            this.fetchData();
        });
    };

    errorSetCoordinates() {
        this.context.router.push({ pathname: '/search/error'});
    };

    getCoords() {
        if (!isEmpty(this.props.location.query)) {
            return {   
                latitude: this.props.location.query.lat, 
                longitude: this.props.location.query.lon
            }
        }

        return {}
    };

    fetchData() {
        var that = this;
        var crd = this.state.crd;

        if (isEmpty(crd)) {
            this.setCoords();
            return;
        }

        var url = HOST + '?lat=' + crd.latitude + '&lon=' + crd.longitude;
        
        fetch(url)
        .then(function(response) {
            if (response.status >= 400) {
                that.context.router.push({pathname: '/serverError'})
            }
            return response.json()
        })
        .then(function(data) {
            that.renderMode(crd, data);
        })
        .catch(function() {
            that.context.router.push({pathname: '/serverError'})
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
                <ErrorBar />
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
            
            if (!place.geometry) {
                return;
            }
            
            var crd = {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            };

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
            <ErrorBar>
                <span> / </span>
                <Link to="/search">tentar de novo</Link>
            </ErrorBar>
         </div>
        )
    }
};