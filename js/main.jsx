var React = require('react/addons')
var ReactRouter = require('react-router')
var App = require('./app.jsx')
var Main = require('./components/main.jsx')

var routes = (
  <ReactRouter.Route handler={App}>
     <ReactRouter.Route name="All" path="/" handler={Main} />
     <ReactRouter.Route name="Completed" path="/completed" handler={Main} />
     <ReactRouter.Route name="Active" path="/active" handler={Main} />
  </ReactRouter.Route>
)

ReactRouter.run(routes, function(Handler) {
  React.render(<Handler/> , document.getElementById('todoapp'))
})
