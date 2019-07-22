import React from 'react';

export default class ItemEdit extends React.Component {
    defaultItem = {
        data: {
            prices: []
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.itemCopy.data[name] = value;
        this.props.itemEditedByUser(this.itemCopy);
    }

    render() {
        this.itemCopy = this.props.item ? {
            _id: this.props.item._id,
            data: {
                ...this.props.item.data,
                prices: this.props.item.data.prices.map(item => ({...item}))
            }
        } : this.defaultItem;

        const item = this.itemCopy;
        return (
            <div>
                <header>
                    Edit item
                </header>
                <div>
                    <p>
                        <label>
                            <span>Select market type: </span>
                            <select name="marketType" type="number" value={item.data.marketType} onChange={this.handleInputChange.bind(this)}>
                                <option value="csgo">CSGO</option>
                                <option value="pubg">PUBG</option>
                                <option value="dota">DOTA</option>
                            </select>
                        </label>
                    </p>
                    <p>
                        <label>
                            <span>Count of items: </span>
                            <input name="count" type="number" value={item.data.count} onChange={this.handleInputChange.bind(this)} />
                        </label>
                    </p>
                    <p>
                        <label>
                            <span>Buy price: </span>
                            <input name="priceBuy" type="number" value={item.data.priceBuy} onChange={this.handleInputChange.bind(this)} />
                        </label>
                    </p>
                    <p>
                        <label>
                            <span>Item ID: </span>
                            <input name="id" type="text" value={item.data.id} onChange={this.handleInputChange.bind(this)} />
                        </label>
                    </p>
                    <p>
                        <label>
                            <span>Item group: </span>
                            <input name="group" type="text" value={item.data.group} onChange={this.handleInputChange.bind(this)} />
                        </label>
                    </p>
                    <p>
                        <label>
                            <span>Paused: </span>
                            <input name="pause" type="checkbox" value={item.data.pause} onChange={this.handleInputChange.bind(this)} />
                        </label>
                    </p>
                </div>
            </div>
        );
    }
}