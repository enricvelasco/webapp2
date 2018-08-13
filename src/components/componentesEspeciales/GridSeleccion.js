import React, { Component } from 'react';
const ReactDataGrid = require('react-data-grid');

const rowsSeleccionadas = []

export class GridSeleccion extends Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = props.columnas
    let rows = this.props.rows
    this.state = { rows, selectedIndexes: [] };
  }

  createRows = () => {

    this._rows = this.props.rows;
  };

  rowGetter = (i) => {
    //console.log("INDEX", this._rows[i]);
    return this._rows[i];
  };

  onCellSelected = ({ rowIdx, idx }) => {
    console.log("CELDA SELECCIONADA", rowIdx, idx);
  };

  onRowsSelected = (rows) => {
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(
        rows.map(r => r.rowIdx)
      )
    });
  };

  onRowsDeselected = (rows) => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  }
  _montarRespuesta = (seleccionados, arrRows) =>{
    var arrResp = []
    seleccionados.forEach(function(index){
      arrResp.push(arrRows[index])
    })
    //this.props.onResults(arrResp)
  }
  render() {
    const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
    console.log("ROW RENDER", this.state.selectedIndexes);
    this._montarRespuesta(this.state.selectedIndexes, this._rows)
    return  (
      <div>
      <span>{this.state.selectedIndexes.length} {rowText} selected</span>
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        enableCellSelect={true}
        rowSelection={{
            showCheckbox: true,
            enableShiftSelect: false,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}
        minHeight={500} />
      </div>);
  }
}
