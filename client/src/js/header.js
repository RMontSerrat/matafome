Header = React.createClass({
    displayName: "Header",

    render: function render() {
        return React.createElement(
            "div",
            { className: "logo" },
            React.createElement("img", { src: "../../src/img/mf_logo.png" })
        );
    }
});