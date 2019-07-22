import React from 'react';
import server from './../../utils/server-communication';
import Item from './../item/item';

export default class ItemLIst extends React.Component {
    items = [];
    constructor() {
        super();
        this.state = {
            viewList: []
        };
        this.getData();
    }
    async getData() {
        this.items = await server.getItemLIst();
        this.setState({
            viewList: [...this.items]
        });
    }

    getFilteredList(type) {
        console.dir(type)
        if (type) {
            console.log()
            return this.items.filter( item => item.data.marketType === type);
        }

        return [...this.items];
    }

    filterItemsBytype(type) {
        this.setState({
            viewList: this.getFilteredList(type)
        })
    }

    filterChanged (event) {
        this.filterItemsBytype(event.target.value);
    }

    updateItem(item) {
        console.log(item);
    }

    render() {
        return (
            <div  className="App-header">
                <h1>Itemlist</h1>
                <div className="item-list__header">
                    <div>  
                        <select onChange={this.filterChanged.bind(this)} defaultValue="">
                            <option value="">All</option>
                            <option value="csgo">CSGO</option>
                            <option value="pubg">PUBG</option>
                            <option value="dota">DOTA</option>
                        </select>
                    </div>
                    <div>
                        <p>Total {this.state.viewList.length} items</p>
                    </div>
                </div>
                {
                    this.state.viewList.length > 0 &&
                    <ol>
                    {this.state.viewList.map((item, index) => (
                        <li key={index.toString()}>
                            <Item item={item} updateItem={this.updateItem.bind(this)} />
                        </li>
                    ))}
                    </ol>
                }
                {
                    this.state.viewList.length === 0 &&
                    <p>No items </p>
                }
                
            </div>
        );
    }
}