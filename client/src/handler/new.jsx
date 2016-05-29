import React from 'react';
import { hashHistory, Link } from 'react-router'
import Header from './header';
import {Default, Invert} from './model';
import fetch from 'isomorphic-fetch';
import {Ticket, ErrorBar} from './components';

export default class New extends Default {
	constructor(props, context) {
		super(props);
        this.state = {
            data: {
                name: '',
                vicinity: '',
                crd: {},
                types: []
            }
        };

        this.save = this.save.bind(this);
	};
	
	componentDidMount() {
        this.resetColor();
		this.bindSubmit();
		this.renderMap();
	};

	getInputAddress() {
        return document.querySelector('input[name="vicinity"]').value;
	};

    getInputName() {
        return document.querySelector('input[name="name"]').value;
    };

	bindSubmit() {
		var that = this;
        var geocoder = new google.maps.Geocoder();

		document.querySelector('form').addEventListener('submit', function (e) {
			e.preventDefault();

			var endereco = that.getInputAddress();
            geocoder.geocode({ 'address': endereco, 'region': 'BR' }, function (results) {
                if (results[0]) {
                    var data = {
                        name: that.getInputName(),
                        vicinity: results[0].formatted_address,
                        location: {
                            lat: results[0].geometry.location.lat(),
                            lon: results[0].geometry.location.lng()
                        },
                        types: results[0].types
                    };

                    that.setState({data: data}, function() {
                        that.save();
                    });
                }
            });
		});
	};

	renderMap() {
		var latlng = new google.maps.LatLng(-22.9134, -43.2007);
		var options = {
			zoom: 17,
			center: latlng
		};

		var map = new google.maps.Map(document.getElementById('map2'), options);
        var marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                icon: '../../src/img/icone_local.png'
            });

        marker.setPosition(latlng);
        this.bindDragMap(marker);
        this.bindAutoComplete(map, marker);
	};

	bindDragMap(marker) {
		var geocoder = new google.maps.Geocoder();
			
		google.maps.event.addListener(marker, 'drag', function () {
			geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						document.querySelector('input[name="vicinity"]').value = results[0].formatted_address;
					}
				}
			});
		});
	};

	bindAutoComplete(map, marker) {
		var input = document.querySelector('input[name="vicinity"]');
		var autocomplete = new google.maps.places.Autocomplete(input);
		
		autocomplete.addListener('place_changed', function() {
		   var place = autocomplete.getPlace();
		   if (!place.geometry) {
			  return;
		   }
			var location = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
			marker.setPosition(location);
			map.setCenter(location);
			map.setZoom(17);
		});
	};

	save() {
		var that = this;
		var data = this.state.data;
		
        fetch(HOST + 'add/', {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
		})
        .then(function(response) {
            if (response.ok) {
                that.context.router.push('/new/success');
            } else {
                that.context.router.push('/new/error');
            }
        })
        .catch(function() {
            that.context.router.push({pathname: '/serverError'});
        })
	};

	render() {
		return (
			<div className="new">
				<Header />
				<h3>novo podrão</h3>
				<form>
					<input type="text" name="name" placeholder="nome do podrão" required="required" />
					<input type="text" name="vicinity" placeholder="endereço" required="required" />
					<div id="map2"></div>
					<input type="submit" id="enviar" value="pronto!" />
                    <a href="#" onClick={this.goBack}>cancelar</a>
				</form>
			</div>
		)
	};
};

export class ErrorNew extends Invert {
	render() {
		return (
		 <div className="feedback">
			<Header />
			<Ticket array={TICKET.bad} />
			<h2>
			   <span>eita, deu ruim, tenta adicionar de novo?</span>
			</h2>
			<Link to="/new">
				<button>adicionar podrão</button>
			</Link>
            <ErrorBar>
                <Link to="/search">explorar podrões</Link>
            </ErrorBar>
		 </div>
		)
	}
};

export class SuccessNew extends Invert {
	render() {
		return (
		 <div className="feedback">
			<Header />
			<Ticket array={TICKET.good} />
			<h2>
			   <span>oba! podrão novo na área. obrigado!</span>
			</h2>
			<Link to="/search">
				<button>explorar podrões</button>
			</Link>
		 </div>
		)
	}
};