var React = require('react/addons')
var Actions = require('../actions')
var classNames = require('classnames')

module.exports = React.createClass({
   propTypes: {
       label: React.PropTypes.string.isRequired,
       isComplete: React.PropTypes.bool.isRequired,
       id: React.PropTypes.number
   },
   mixins: [React.addons.LinkedStateMixin], // exposes this.linkState used in render
   getInitialState: function() {
       return {};
   },
   handleToggle: function(evt) {
       Actions.toggleItem(this.props.id);
   },
   handleEditStart: function(evt) {
       evt.preventDefault();
       // because of linkState call in render, field will get value from this.state.editValue
       this.setState({
           isEditing: true,
           editValue: this.props.label
       }, function() {
           this.refs.editInput.getDOMNode().focus();
       });
   },
   handleValueChange: function(evt) {
       var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
       // we pressed enter, if text isn't empty we blur the field which will cause a save
       if (evt.which === 13 && text) {
           this.refs.editInput.getDOMNode().blur();
       }
       // pressed escape. set editing to false before blurring so we won't save
       else if (evt.which === 27) {
           this.setState({ isEditing: false },function(){
               this.refs.editInput.getDOMNode().blur();
           });
       }
   },
   handleBlur: function() {
       var text = this.state.editValue
       if (this.state.isEditing && text) {
           Actions.editItem(this.props.id, text)
       }
       this.setState({isEditing:false})
   },
   handleDestroy: function() {
       Actions.removeItem(this.props.id)
   },
   handleClick : function(){
    console.log(this.props.id)
   },
   render: function() {
       var classes = classNames({
           'completed': this.props.isComplete,
           'editing': this.state.isEditing
       });
       return (
           <li className={classes}>
               <div className="view">
                   <input className="toggle" onClick={this.handleClick} type="checkbox" checked={!!this.props.isComplete} onChange={this.handleToggle} />
                   <label onDoubleClick={this.handleEditStart}>{this.props.label}</label>
                   <button className="destroy" onClick={this.handleDestroy}></button>
               </div>
               <input ref="editInput" className="edit" valueLink={this.linkState('editValue')} onKeyUp={this.handleValueChange} onBlur={this.handleBlur} />
           </li>
       );
   }
})
