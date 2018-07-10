import React, { Component } from 'react';
import {CampoLink} from '../componentesGrid/CampoLink'
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

    //this.state = null;
    let rows = this.props.rows
    this.state = { rows, selectedIndexes: [] };
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
    //console.log("INDEX", this._rows[i]);
    return this._rows[i];
  };

  /*getCellActions(column, row) {
    console.log("COLUMN", column);
    if (column.key === 'email') {
      console.log("COINCIDE COLUMNA");
      return [
        {
          formatter: <CampoLink/>
        }
      ];
    }
  }*/

  onCellSelected = ({ rowIdx, idx }) => {
    //this.grid.openCellEditor(rowIdx, idx);

    console.log("CELDA SELECCIONADA", rowIdx, idx);

  };

  onRowsSelected = (rows) => {
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
    console.log("ROW SELECTED", rows);
  };

  onRowsDeselected = (rows) => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
    console.log("ROW DESSELECTED", rows);
  };

  render() {
    const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
    return  (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        enableCellSelect={true}
        //getCellActions={this.getCellActions.bind(this)}
        //onCellSelected={this.onCellSelected}

        rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}
        minHeight={500} />);
  }
}
