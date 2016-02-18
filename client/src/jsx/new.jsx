var New = React.createClass({
    getInitialState: function getInitialState () {
        return {
            data:{}
        }
    },

    componentDidMount: function componentDidMount () {
        initMap();
        this.bindSubmit();
    },

    getLocation: function getLocation () {
        var that = this;
        var endereco = this.state.data.vicinity;
        var geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ 'address': endereco, 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    var location = {lat: latitude, lon: longitude};

                    that.state.data.location = location;
                    that.save();
                }
            }
        });
    },

    bindSubmit: function bindSubmit () {
        var that = this;

        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            that.state.data = $(this).serializeObject();
            that.getLocation();
        });
    },

    save: function () {
        var data = this.state.data;

        console.log(data);
        $.ajax({
            url: 'http://localhost:5000/add/',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                console.log(response);
            }
        });
    },

    render: function render () {
        return (
            <div>
                <h3>novo podrão</h3>
                <form>
                    <input type="text" name="name" placeholder="nome do podrão" />
                    <input type="text" name="vicinity" placeholder="onde fica?" />
                    <label for="opening_hours">horário de funcionamento</label>
                    <input type="text" name="opening_hours[]" placeholder="de" />
                    <input type="text" name="opening_hours[]" placeholder="ate" />
                    <label>o que oferece?</label>
                    <input type="checkbox" name="types[]" value="burguer" />
                    <label for="option">Burguer</label>
                    <input type="checkbox" name="types[]" value="cachorro" />
                    <label for="option">Cachorro</label>
                    <input type="checkbox" name="types[]" value="churrasquinho" />
                    <label for="option">Churras</label>
                    <input type="checkbox" name="types[]" value="caldos" />
                    <label for="option">Caldos</label>
                    <input type="checkbox" name="types[]" value="outros" />
                    <label for="option" id="outros">Outros</label>
                    <input type="submit" value="pronto!"></input>
                </form>
            </div>
        )
    } 
});