import React from 'react';

export default class ItemEdit extends React.Component {

    render() {
        const item = this.props.item;
        return (
            <div>
                <header>
                    Edit item {item.data.marketType}
                </header>
            </div>
        );
    }
}