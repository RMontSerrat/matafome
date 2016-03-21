import React from 'react';
import Header from './header';

class Empty extends React.Component {
    constructor(props) {
        super(props);
    };

    errorLocation() {
      this.props.updateMode('error');
    };

    newPodrao() {
      this.props.updateMode('new');
    };

    render() {
      return (
         <div className="search">
            <Header updateMode={this.props.updateMode} mode={this.props.mode} />
            <h2 className="loading">
                <span>não achamos nenhum perto de você :(</span>
                <button onClick={this.newPodrao.bind(this)}>adicionar podrão</button>
            </h2>
         </div>
      )
    };
};

export default Empty;
