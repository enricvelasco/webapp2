import React, { Component } from 'react';
const ReactDataGrid = require('react-data-grid');

export class Grid extends Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = props.columnas
    /*this._columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' } ];*/

    this.state = null;
  }

  createRows = () => {
    /*let rows = [];
    for (let i = 1; i < this.props.rows; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }*/

    this._rows = this.props.rows;
  };

  rowGetter = (i) => {
    return this._rows[i];
  };

  render() {
    return  (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} />);
  }
}
