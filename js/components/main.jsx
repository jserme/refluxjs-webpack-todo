var React = require('react/addons')
var ReactRouter = require('react-router')
var Item = require('./item.jsx')
var Actions = require('../actions')
var classNames = require('classnames')
module.exports = React.createClass({
    mixins: [ ReactRouter.State ],
    propTypes: {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
    toggleAll: function(evt) {
        Actions.toggleAllItems(evt.target.checked);
    },
    render: function() {
        var filteredList;
        switch(this.getPath()){
            case '/completed':
                filteredList = _.filter(this.props.list,function(item){ return item.isComplete; })
                break;
            case '/active':
                filteredList = _.filter(this.props.list,function(item){ return !item.isComplete; })
                break;
            default:
                filteredList = this.props.list;
        }

        var classes = classNames({
            "hidden": this.props.list.length < 1
        })

        return (
            <section className="main {classes}">
                <input className="toggle-all" type="checkbox" onChange={this.toggleAll} />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    { filteredList.map(function(item){
                        return <Item label={item.label} isComplete={item.isComplete} id={item.key} key={item.key}/>;
                    })}
                </ul>
            </section>
        )
    }
})
