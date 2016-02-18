EmailList = React.createClass({
   displayName: "EmailList",

   getInitialState: function getInitialState() {
      return {
         data: [],
         loading: true,
         query: {
            search: {
               name: "",
               subject: ""
            },
            sorting: {
               sort: "date",
               order: "asc"
            },
            filter: {
               date: ""
            }
         },
         nextPage: 1,
         total: 0,
         canRun: true
      };
   },

   getDocHeight: function getDocHeight() {
      var D = document;
      return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
   },

   bindScrollEvent: function bindScrollEvent() {
      var self = this;

      window.addEventListener('scroll', function () {
         if (self.state.canRun) {
            if (window.scrollY + window.innerHeight >= self.getDocHeight() && self.state.nextPage !== null) {
               self.state.canRun = false;
               self.renderEmailsFromServer();
            }
         }
      });
   },

   renderEmailsFromServer: function renderEmailsFromServer() {
      var params = '?' + config.paramObj(this.state.query.search) + '&' + config.paramObj(this.state.query.filter) + '&' + config.paramObj(this.state.query.sorting) + '&page=' + this.state.nextPage;

      var request = pegasus(config.server + params);

      request.then((function (data) {
         var newList = [];
         newList = newList.concat(this.state.data, data.pessoas);
         this.setState({
            data: newList,
            loading: false,
            nextPage: data.nextPage,
            total: data.total,
            canRun: true
         });
         this.bindScrollEvent();
      }).bind(this), (function (data, xhr) {
         console.error(data, xhr.status);
      }).bind(this));
   },

   onQueryChange: function onQueryChange(state, value) {
      var self = this;

      this.state.query[state] = value;
      this.setState({
         data: [],
         loading: true,
         nextPage: 1
      }, function () {
         self.renderEmailsFromServer();
      });
   },

   componentDidMount: function componentDidMount() {
      this.renderEmailsFromServer();
   },

   bindTotalCount: function bindTotalCount() {
      var totalShow = 0,
          total = this.state.total;

      if (!this.state.loading) {
         totalShow = this.state.data.length || 0;
      }

      return React.createElement(
         "div",
         { className: "emails-total" },
         "Mostrando ",
         React.createElement(
            "strong",
            null,
            totalShow
         ),
         " resultados de ",
         React.createElement(
            "strong",
            null,
            total
         )
      );
   },

   render: function render() {
      var emails = [];
      if (!this.state.loading) {
         this.state.data.forEach(function (email, i) {
            emails.push(React.createElement(EmailResult, { data: email._source, key: i }));
         });
      }

      return React.createElement(
         "section",
         null,
         React.createElement(
            "nav",
            { className: "emails-filter" },
            React.createElement(Search, { onChange: this.onQueryChange, search: this.state.query.search }),
            React.createElement(Filter, { onChange: this.onQueryChange, filter: this.state.query.filter })
         ),
         React.createElement(
            "div",
            { className: "emails-list" },
            this.bindTotalCount(),
            React.createElement(EmailAnchor, { onChange: this.onQueryChange, sorting: this.state.query.sorting }),
            React.createElement(
               "div",
               { className: "emails-list-result" },
               emails
            )
         )
      );
   }
});