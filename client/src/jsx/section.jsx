import React from 'react';
import Home from './home';
import Search from './search';
import List from './list';
import New from './new';
import Error from './error';
import Empty from './empty';


class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
            data: [],
            crd: []
        };
    };

    updateMode(mode, data, crd) {
        this.setState({
            mode: mode,
            data: data || [],
            crd: crd || []
        });
    };

    render() {
        switch (this.state.mode) {
            case 'search':
                return (
                    <Search updateMode={this.updateMode.bind(this)} mode={this.state.mode} />
                );
            case 'list':
                return (
                    <List updateMode={this.updateMode.bind(this)} mode={this.state.mode} data={this.state.data} crd={this.state.crd} />
                );
            case 'new':
                return (
                    <New updateMode={this.updateMode.bind(this)} mode={this.state.mode} />
                )
            case 'error':
                return (
                    <Error updateMode={this.updateMode.bind(this)} mode={this.state.mode} />
                )
            case 'empty':
                return (
                    <Empty updateMode={this.updateMode.bind(this)} mode={this.state.mode} />
                )
        }
        return (
            <Home updateMode={this.updateMode.bind(this)} mode={this.state.mode} />
        );
    }
};

export default Section;