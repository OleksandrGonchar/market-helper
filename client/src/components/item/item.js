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
    componentDidMount() {
        if (!this.props.item) {
            console.log('change to edit');
            this.tooggleEditState();
        } else {
            this.item = {
                _id: this.props.item._id,
                data: {
                    ...this.props.item.data,
                    prices: this.props.item.data.prices.map(item => ({...item}))
                }
            }
        }
    }
    tooggleEditState() {
        this.setState({
            edit: !this.state.edit
        });
    }
    getButtonText() {
        return this.state.edit ? 'Cancel' : 'Edit'
    }

    updateItem(item = this.props.item) {
        this.props.updateItem(item);
    }

    itemEditedByUser(item) {
        const updatedItem = {
            _id: item._id,
            data: {
                ...item.data,
                prices: item.data.prices.map(item => ({...item}))
            }
        };
        this.item = updatedItem;
    }

    render() {
        return (
            <div>
                { !this.state.edit && this.item && <ItemView item={this.item} /> }
                { this.state.edit && <ItemEdit item={this.item} itemEditedByUser={this.itemEditedByUser.bind(this)} /> }
                { this.state.edit && <button onClick={() => this.updateItem(this.item) } >Save</button> }
                <button onClick={this.tooggleEditState.bind(this)}>{this.getButtonText.call(this)}</button>
            </div>
        );
    }
}