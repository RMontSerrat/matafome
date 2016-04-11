import rp from 'request-promise';
import React from 'react';
import Header from './header';

class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    };
    
    componentDidMount () {
        initMap();
        this.bindSubmit();
    };

    getLocation () {
        var that = this;
        var endereco = this.state.data.vicinity;
        var geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ 'address': endereco, 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var location = {lat: results[0].geometry.location.lat(), lon: results[0].geometry.location.lng()};
                    var data = that.state.data;
                    
                    data.location = location;
                    that.setState({
                        data: data
                    });
                    that.save();
                }
            }
        });
    };

    getTypes () {
        return [].slice.call(document.querySelectorAll('input[name="types[]"]:checked')).map(function (type) {
            return type.value;
        });
    };

    bindSubmit () {
        var that = this;

        document.querySelector('form').addEventListener('submit', function (e) {
            e.preventDefault();
            var data = {
                name: document.querySelector('input[name="name"]').value,
                vicinity: document.querySelector('input[name="vicinity"]').value,
                types: that.getTypes()
            };

            that.setState({
                data: data
            });

            that.getLocation();
        });
    };

    save () {
        rp({
            url: 'http://localhost:5000/add/', 
            method: 'POST',
            json: this.state.data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(req) {
            console.log(req);
        });
    };

    render () {
        return (
            <div className="new">
                <Header updateMode={this.props.updateMode} mode={this.props.mode} />
                <h3>novo podrão</h3>
                <form>
                    <input type="text" name="name" placeholder="nome do podrão" required="required" />
                    <input type="text" name="vicinity" placeholder="onde fica?" required="required" />
                    {/* <label for="opening_hours">horário de funcionamento</label> 
                    <input type="text" name="opening_hours[]" placeholder="de" />
                    <input type="text" name="opening_hours[]" placeholder="ate" />*/}
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
                    <label htmlFor="outros" id="outros">outros</label>
                    <input type="submit" id="enviar" value="pronto!" />
                </form>
            </div>
        )
    };
};

export default New;