import React from 'react';

export default class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketValue: this.setTicketValue()
        };
    };

    setTicketValue() {
        return;
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

    render() {
        return (
            <div className="ticket ticket-card">
                <p><span>{this.state.ticketValue}</span></p>
            </div>
        )
    };
};

export class TicketGood extends Ticket {
    constructor(props) {
        super(props);
    };

    setTicketValue() {
        return config.good[Math.floor(Math.random() * config.good.length)]
    };
};

export class TicketBad extends Ticket {
    constructor(props) {
        super(props);
    };

    setTicketValue() {
        return config.bad[Math.floor(Math.random() * config.bad.length)]
    };
};