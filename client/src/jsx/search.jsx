import React from 'react';
import Header from './header';

class Search extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        
        navigator.geolocation.getCurrentPosition(this.successLocation.bind(this), this.errorLocation.bind(this), options);
    };

    renderMode(data, crd) {
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

        $.ajax({
            url: url,
            data: data,
            type: "GET",
            crossDomain: true,
            success: function(data){
                that.renderMode(data, crd);
            }
        });
    };

    errorLocation() {
      this.props.updateMode('error');
    };

    render() {
      return (
         <div className="search">
            <Header updateMode={this.props.updateMode} mode={this.props.mode} />
            <h2 className="loading">
               <span>procurando podrões bem, bem gordurosos...</span>
            </h2>
         </div>
      )
    };
};

export default Search;
