import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
    };

    renderSearch() {
        this.props.updateMode('search');
    };

    render() {
        return (
            <div className="home">
                <div className="bg"></div>
                <div className="content">
                    <img src="../../src/img/foto_burger-01.png" />
                    <div className="actions">
                        <button onClick={this.renderSearch.bind(this)}>buscar podrão</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default Home;