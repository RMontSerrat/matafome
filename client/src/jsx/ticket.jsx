import React from 'react';

export default class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketValue: '',
            array: this.getArray()
        };
    };

    setTicketValue() {
        return this.state.array[Math.floor(Math.random() * this.state.array.length)]
    };

    componentDidMount() {
        this.setState({
            ticketValue: this.setTicketValue()
        });
    };

    componentWillReceiveProps() {
        this.setState({
            ticketValue: this.setTicketValue()
        });
    };

    getArray() {
        return [];
    };

    render() {
        return (
            <div className="ticket ticket-card">
                <i className="icon-decagono"></i>
                <p><span>{this.state.ticketValue}</span></p>
            </div>
        )
    };
};

export class TicketGood extends Ticket {
    constructor(props) {
        super(props);
    };

    getArray() {
        return config.good;
    };
};

export class TicketBad extends Ticket {
    constructor(props) {
        super(props);
    };

    getArray() {
        return config.bad;
    };

};