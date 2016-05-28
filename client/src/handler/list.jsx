import React from 'react';
import Header from './header';
import Ticket from './ticket';
import Generic from './model';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';

class Botao extends Ticket {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <button onClick={this.props.onClick}>{this.state.ticketValue}</button>
        )
    };
};

export default class List extends Generic {
    constructor(props, context) {
        super(props);
        this.state = {
            podrao: this.props.location.state ? this.props.location.state.data.podroes[0]._source : {}, 
            i: 0,
            address: this.getAddress()
        }
    };

    componentDidMount() {
        this.verifyData();
        this.invertColor();
        this.renderMap();
    };

    verifyData() {
        if(isEmpty(this.state.podrao)) {
            this.context.router.push({ pathname: '/search', search: '?lat=' + this.props.location.query.lat + '&lon=' + this.props.location.query.lon, state: {} });
        };
    };

    update() {
        var that = this;
        var i = this.state.i;

        if(i >= this.props.location.state.data.podroes.length-1) {
            this.context.router.push('/list/end');
            return;
        }

        this.setState({
            podrao: this.props.location.state.data.podroes[i+1]._source,
            i: i+1
        }, function () {
            that.renderMap();
        });
    };

    getCurrentAddress(directionsDisplay) {
        var that = this;
        var latlng = new google.maps.LatLng(this.props.location.query.lat, this.props.location.query.lon);
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            "location": latlng
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var address = results[0].formatted_address;
                
                localStorage.setItem('address', JSON.stringify(address));
                
                that.setState({
                    address: address
                }, function () {
                    that.renderRoute();
                });
            }
        });
    };

    renderMap() {
        if(isEmpty(this.state.address)) {
            this.getCurrentAddress();
        } else {
            this.renderRoute();
        }
    };

    renderRoute(directionsDisplay) {
        var that = this;
        var map;
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var options = {
            zoom: 18,
            center: new google.maps.LatLng(this.props.location.query.lat, this.props.location.query.lon),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         
        map = new google.maps.Map(document.getElementById('map'), options);
        var directionsService = new google.maps.DirectionsService();
        var request = { 
            origin: this.state.address,
            destination: this.state.podrao.vicinity,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var leg = result.routes[0].legs[0];
                var mStart = new google.maps.Marker({
                    icon: '../../src/img/icone_local.png',
                    position: leg.start_location,
                    map: map,
                    animation: google.maps.Animation.DROP
                });

                var mEnd = new google.maps.Marker({
                    icon: '../../src/img/icone_mapa.png',
                    position: leg.end_location,
                    map: map,
                    animation: google.maps.Animation.DROP
                });

                directionsDisplay.setDirections(result);
                directionsDisplay.setOptions({
                    suppressMarkers: true,
                    polylineOptions: {
                        strokeWeight: 6,
                        strokeOpacity: 0.7,
                        strokeColor:  '#ff002b'
                    }
                });
                directionsDisplay.setMap(map);
            }
        });
    };

    render() {
        var podrao = this.state.podrao;

        return (
            <section className="card">
                <Header />
                <div className="card-informations">
                    <h1>{podrao.name}</h1>
                    <p>{podrao.vicinity}</p>
                    <Ticket array={TICKET.good} /> 
               </div>
               <Botao onClick={this.update.bind(this)} array={TICKET.button} />
                <div id="map"></div>
            </section>
        )
    };
};

export class EndList extends Generic {
    componentDidMount() {
        this.resetColor();
    };

    render() {
        return (
         <div className="feedback">
            <Header />
            <Ticke array={TICKET.bad} />
            <h2>
               <span>não existem mais podrões próximos</span>
            </h2>
            <Link to="/search">
                <button>explorar podrões</button>
            </Link>
         </div>
        )
    }
};