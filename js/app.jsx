var React = require('react/addons')
var ReactRouter = require('react-router')
var Reflux = require('reflux')
var Store = require('./store')
var Header = require('./components/header.jsx')
var Footer = require('./components/footer.jsx')

module.exports = React.createClass({
    // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
    mixins: [Reflux.connect(Store,"list")],

    render: function() {
        return (
            <div>
                <Header />
                <ReactRouter.RouteHandler list={this.state.list} />
                <Footer list={this.state.list} />
            </div>
        );
    }
})
