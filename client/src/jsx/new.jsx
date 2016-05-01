import request from 'request';
import React from 'react';
import { browserHistory } from 'react-router'
import Header from './header';
import Generic from './model';
import {TicketBad, TicketGood} from './ticket';
class New extends Generic {
	constructor(props) {
		super(props);
		// this.state = {
		// 	crd: localStorage.crd ? JSON.parse(localStorage.crd) : {},
		// 	geocoder: new google.maps.Geocoder(),
		// 	map: {},
		// 	marker: {}
		// };
	};
	
	componentDidMount() {
		initMap();
		this.bindSubmit();
		this.setColor();
	};

	getTypes() {
		return [].slice.call(document.querySelectorAll('input[name="types[]"]:checked')).map(function (type) {
			return type.value;
		});
	};

	bindSubmit() {
		var that = this;

		document.querySelector('form').addEventListener('submit', function (e) {
			e.preventDefault();
			var endereco = document.querySelector('input[name="vicinity"]').value;
			that.getLocationByAddress(endereco, that.save.bind(that));
		});
	};

	// renderMap() {
	// 	var latlng = new google.maps.LatLng(this.state.crd.lat, this.state.crd.lon);
	// 	var directionsDisplay = new google.maps.DirectionsRenderer();
	// 	var options = {
	// 		zoom: 17,
	// 		center: latlng,
	// 		mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	};

	// 	var map = new google.maps.Map(document.getElementById('map2'), options);

	// 	this.setState({
	// 		map: map
	// 	})

	// 	this.markMap(latlng, map);
	// };

	// markMap(latlng, map) {
	// 	var marker = new google.maps.Marker({
	// 			map: map,
	// 			draggable: true
	// 		});

	// 	marker.setPosition(latlng);
		
	// 	this.setState({
	// 		marker: marker
	// 	});
	// };

	save() {
		var that = this;
		var data = {
			name: document.querySelector('input[name="name"]').value,
			vicinity: document.querySelector('input[name="vicinity"]').value,
			// types: that.getTypes(),
			location: [this.state.crd.latitude, this.state.crd.longitude]
		};
		request({
			url: 'https://matafome-api.herokuapp.com/add/',
			json: data,
			method: 'POST'
		}, function(err, response, data) {
			if (data) {
				browserHistory.push('/new/success');
			} else {
				browserHistory.push('/new/error');
			}
		});
	};

	render() {
		return (
			<div className="new">
				<Header />
				<h3>novo podrão</h3>
				<form>
					<input type="text" name="name" placeholder="nome do podrão" required="required" />
					<input type="text" name="vicinity" placeholder="onde fica?" required="required" value={this.state.address || ''} />
					{/* <label for="opening_hours">horário de funcionamento</label> 
					<input type="text" name="opening_hours[]" placeholder="de" />
					<input type="text" name="opening_hours[]" placeholder="ate" />
					<label className="types" htmlFor="types">o que tem lá?</label>
					<input type="checkbox" id="burguer" name="types[]" value="burguer" />
					<label htmlFor="burguer">burguer</label>
					<input type="checkbox" id="cachorro" name="types[]" value="cachorro" />
					<label htmlFor="cachorro">cachorro</label>
					<input type="checkbox" id="churrasquinho" name="types[]" value="churrasquinho" />
					<label htmlFor="churrasquinho">churras</label>
					<input type="checkbox" id="caldos" name="types[]" value="caldos" />
					<label htmlFor="caldos">caldos</label>
					<input type="checkbox" id="tapioca" name="types[]" value="tapioca" />
					<label htmlFor="tapioca" id="tapioca">tapioca</label>
					<input type="checkbox" id="pastel" name="types[]" value="pastel" />
					<label htmlFor="pastel" id="pastel">pastel</label>
					<input type="checkbox" id="batata" name="types[]" value="batata" />
					<label htmlFor="batata" id="batata">batata</label>
					<input type="checkbox" id="outros" name="types[]" value="outros" />
					<label htmlFor="outros" id="outros">outros</label>*/}
					<input type="submit" id="enviar" value="pronto!" />
				</form>
			</div>
		)
	};
};

export class ErrorNew extends Generic {
	render() {
		return (
		 <div className="search">
			<Header />
			<TicketBad />
			<h2 className="loading">
			   <span>eita, deu ruim, tenta adicionar de novo?</span>
			</h2>
			<Link to="/new">
				<button>adicionar podrão</button>
			</Link>
		 </div>
		)
	}
};

export class SuccessNew extends Generic {
	render() {
		return (
		 <div className="search">
			<Header />
			<TicketGood />
			<h2 className="loading">
			   <span>oba! podrão novo na área. obrigado!</span>
			</h2>
			<Link to="/list">
				<button>explorar podrões</button>
			</Link>
		 </div>
		)
	}
};


export default New;