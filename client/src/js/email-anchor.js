var EmailAnchor = React.createClass({
   displayName: "EmailAnchor",

   orderEmails: function orderEmails(e) {
      if (e.target.nodeName === "SPAN" || e.target.nodeName === "I") {
         return;
      }

      function removeClasses() {
         [].slice.call(document.querySelectorAll('.emails-list-column')).forEach(function (column) {
            column.classList.remove("order-asc");
            column.classList.remove("order-desc");
         });
      }

      var name = e.target.getAttribute("name");
      if (e.target.classList.contains("order-asc")) {
         removeClasses();
         e.target.classList.add("order-desc");
         this.props.sorting.order = "desc";
      } else {
         removeClasses();
         e.target.classList.add("order-asc");
         this.props.sorting.order = "asc";
      }
      this.props.sorting.sort = name;
      this.props.onChange("sorting", this.props.sorting);
   },

   render: function render() {
      return React.createElement(
         "div",
         { className: "emails-list-row emails-list-anchor" },
         React.createElement(
            "div",
            { className: "emails-list-column", onClick: this.orderEmails, name: "name" },
            "Nome",
            React.createElement("i", { className: "fa fa-sort-down" }),
            React.createElement("i", { className: "fa fa-sort-up" })
         ),
         React.createElement(
            "div",
            { className: "emails-list-column", onClick: this.orderEmails, name: "subject" },
            "Assunto",
            React.createElement("i", { className: "fa fa-sort-down" }),
            React.createElement("i", { className: "fa fa-sort-up" })
         ),
         React.createElement(
            "div",
            { className: "emails-list-column order-asc", onClick: this.orderEmails, name: "date" },
            "Quando",
            React.createElement("i", { className: "fa fa-sort-down" }),
            React.createElement("i", { className: "fa fa-sort-up" })
         )
      );
   }
});