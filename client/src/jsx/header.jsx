import React from 'react';

class Header extends React.Component {
    renderNew () {
        this.props.updateMode('new');
    };

    renderHome () {
        this.props.updateMode('home');
    };

    render() {
        return (
            <header>
                <div className="logo-header" onClick={this.renderHome.bind(this)}>
                    <img src="../../src/img/mf_logo.png" />
                </div>
                <div className="icon-new" onClick={this.renderNew.bind(this)}>
                    <img src="../../src/img/mf_menu.png" />
                </div>
            </header>
        );
    }
};

export default Header;