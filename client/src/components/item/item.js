import React from 'react';
import ItemView from './item-view/item-view';
import ItemEdit from './item-edit/item-edit';

export default class Item extends React.Component {
    edit = false;
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
    }
    tooggle() {
        this.setState({
            edit: !this.state.edit
        });
    }
    getButtonText() {
        return this.state.edit ? 'Cancel' : 'Edit'
    }

    updateItem() {
        this.props.updateItem(this.props.item);
    }

    render() {
        return (
            <div>
                { !this.state.edit && <ItemView item={this.props.item} /> }
                { this.state.edit && <ItemEdit item={this.props.item} /> }
                { this.state.edit && <button onClick={this.updateItem.bind(this)} >Save</button> }
                <button onClick={this.tooggle.bind(this)}>{this.getButtonText.call(this)}</button>
            </div>
        );
    }
}