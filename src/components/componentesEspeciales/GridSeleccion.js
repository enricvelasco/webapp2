import React, { Component } from 'react';
const ReactDataGrid = require('react-data-grid');

const rowsSeleccionadas = []

export class GridSeleccion extends Component {
  constructor(props, context) {
    super(props, context);
    this.createRows();
    this._columns = props.columnas
    var rows = props.rows
    //this.state = { selectedIndexes: [] };
    this.state = { expanded: {}, rows: rows, selectedIndexes: []  };
    console.log("ROWS!!!!!",rows);
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

  getSubRowDetails = (rowItem) => {
    console.log("GET SUBROW DETAILS", rowItem);
      let isExpanded = this.state.expanded[rowItem.nombre] ? this.state.expanded[rowItem.nombre] : false;
      console.log("GET SUBROW DETAILS", rowItem);
      return {
        group: rowItem.categoriasHijas && rowItem.categoriasHijas.length > 0,
        expanded: isExpanded,
        children: rowItem.categoriasHijas,
        field: 'nombre',
        treeDepth: rowItem.treeDepth || 0,
        siblingIndex: rowItem.siblingIndex,
        numberSiblings: rowItem.numberSiblings
      };
    };

    onCellExpand = (args) => {
      console.log("ON CELL EXPAND", args);
      let rows = this.state.rows.slice(0);
      let rowKey = args.rowData.name;
      let rowIndex = rows.indexOf(args.rowData);
      let subRows = args.expandArgs.children;

      let expanded = Object.assign({}, this.state.expanded);
      console.log("ON CELL EXPAND EXPANDED", expanded);
      if (expanded && !expanded[rowKey]) {
        expanded[rowKey] = true;
        this.updateSubRowDetails(subRows, args.rowData.treeDepth);
        rows.splice(rowIndex + 1, 0, ...subRows);
      } else if (expanded[rowKey]) {
        expanded[rowKey] = false;
        rows.splice(rowIndex + 1, subRows.length);
      }

      this.setState({ expanded: expanded, rows: rows });
    };

  updateSubRowDetails = (subRows, parentTreeDepth) => {
    let treeDepth = parentTreeDepth || 0;
    subRows.forEach((sr, i) => {
      sr.treeDepth = treeDepth + 1;
      sr.siblingIndex = i;
      sr.numberSiblings = subRows.length;
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
    console.log("ROW RENDER 2", this.state._rows);
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
        minHeight={200}
        minWidth={400} />
      </div>);
  }
}
