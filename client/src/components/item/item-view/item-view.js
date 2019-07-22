import React from 'react';

export default class ItemView extends React.Component {

    render() {
        const item = this.props.item;
        return (
            <div>
                <header>
                    {item.data.marketType}
                </header>
            </div>
        );
    }
}