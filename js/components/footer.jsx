var React = require('react/addons')
var ReactRouter = require('react-router')
var Actions = require('../actions')
var classNames = require('classnames')
module.exports = React.createClass({
    propTypes: {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
    render: function() {
        var nbrcompleted = _.filter(this.props.list, "isComplete").length,
            nbrtotal = this.props.list.length,
            nbrincomplete = nbrtotal-nbrcompleted,
            clearButtonClass = classNames({hidden: nbrcompleted < 1}),
            footerClass = classNames({hidden: !nbrtotal }),
            completedLabel = "Clear completed (" + nbrcompleted + ")",
            itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";
        return (
            <footer className="footer {footerClass}">
                <span className="todo-count"><strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
                <ul className="filters">
                    <li>
                        <ReactRouter.Link activeClassName="selected" to="All">All</ReactRouter.Link>
                    </li>
                    <li>
                        <ReactRouter.Link activeClassName="selected" to="Active">Active</ReactRouter.Link>
                    </li>
                    <li>
                        <ReactRouter.Link activeClassName="selected" to="Completed">Completed</ReactRouter.Link>
                    </li>
                </ul>
                <button className="clear-completed {clearButtonClass}" onClick={Actions.clearCompleted}>{completedLabel}</button>
            </footer>
        )
    }
})
