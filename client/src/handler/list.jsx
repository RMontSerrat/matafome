import React from 'react';
import { Link } from 'react-router';

import Header from './header';
import {Default, Invert} from './model';
import {ErrorBar, Ticket} from './components';

import {first, delay} from 'lodash';

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

export default class List extends Invert {
    constructor(props, context) {
        super(props);
        this.state = {
            data: _.first(this.props.location.state.data.podroes)._source,
            i: 0
        }

        this.update = this.update.bind(this);
    };

    componentDidMount() {
        this.invertColor();
        this.renderMap();
    };

    componentDidUpdate() {
        this.renderMap();
    };

    endData() {
        return this.state.i >= this.props.location.state.data.podroes.length-1;
    };

    update() {
        var that = this;
        var i = this.state.i;

        if(this.endData()) {
            this.context.router.push('/list/end');
            return;
        }

        this.setState({
            data: this.props.location.state.data.podroes[i+1]._source,
            i: i+1
        });
    };

    renderMap() {
        var that = this;
        var map = new google.maps.Map(document.getElementById('map'));
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin: new google.maps.LatLng(this.props.location.query.lat, this.props.location.query.lon),
            destination: this.state.data.vicinity,
            travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
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
                var leg = result.routes[0].legs[0];
                that.renderMark(map, leg.start_location, '../../src/img/icone_local.png');
                that.renderMark(map, leg.end_location, '../../src/img/icone_mapa.png');
            }
        });
    };

    renderMark(map, position, icon) {
        delay(function(){
            new google.maps.Marker({
                icon: icon,
                position: position,
                map: map,
                animation: google.maps.Animation.DROP
            });
        }, 200);
    };

    render() {
        var podrao = this.state.data;

        return (
            <section className="card">
                <Header />
                <div className="card-informations">
                    <h1>{podrao.name}</h1>
                    <p>{podrao.vicinity}</p>
                    <Ticket data={TICKET.good} />
               </div>
               <Botao onClick={this.update} data={TICKET.button} />
                <div id="map"></div>
            </section>
        )
    };
};

export class EndList extends Default {
    render() {
        return (
            <div className="feedback">
                <Header />
                <Ticket data={TICKET.bad} />
                <h2>
                   <span>não existem mais podrões próximos</span>
                </h2>
                <Link to="/search">
                    <button>explorar podrões</button>
                </Link>
                <ErrorBar />
            </div>
        )
    }
};