import React, { Component } from 'react';
const ReactDataGrid = require('react-data-grid');

var rowsSeleccionadas = []

export class GridSeleccion extends Component {
  constructor(props, context) {
    super(props, context);

    this._columns = props.columnas
    var rows = props.rows
    this.state = { expanded: {}, rows: rows, selectedIndexes: []  };
    this.createRows();
    console.log("ROWS!!!!!",rows);
  }

  componentDidMount=()=>{
    console.log("TODO CARGADO");
    if(this.props.valor!=null){
      console.log("VALOR != NULL");
      //var marcarIniciales = []
      this.props.valor.map((val) => {
        this._rows.forEach((valRow, loop) => {
          if(val.idCategoriaLocal==valRow.id){
            console.log("ACTIVAR", valRow);
            var arrInicial = []
            arrInicial.push({row:valRow,rowIdx:loop})
            this.onRowsSelected(arrInicial)
          }
        })
      });
    }
  }

  createRows = () => {
    console.log("CARGA INICIAL", this.props);
    this._rows = this.props.rows;
    this._rows.forEach((val) => {
        rowsSeleccionadas.push({id:val.id, isSelect:false})
    });
    /*if(this.props.valor!=null){
      console.log("VALOR != NULL");
      //var marcarIniciales = []
      this.props.valor.map((val) => {
        this._rows.forEach((valRow, loop) => {
          if(val.idCategoriaLocal==valRow.id){
            console.log("ACTIVAR", valRow);
            var arrInicial = []
            arrInicial.push({row:valRow,rowIdx:loop})
            this.onRowsSelected(arrInicial)
          }
        })
      });
    }*/
    //rowsSeleccionadas
  };

  rowGetter = (i) => {
    //console.log("INDEX", this._rows[i]);
    return this._rows[i];
  };

  onCellSelected = ({ rowIdx, idx }) => {
    console.log("CELDA SELECCIONADA", rowIdx, idx);
  };

  onRowsSelected = (rows) => {
    console.log("ROW SELECT", rows);
    rowsSeleccionadas.map((valor1)=>{
      rows.map((row)=>{
        if(row.row.id == valor1.id){
          console.log("ASIGNA TRUE", valor1.id);
          valor1.isSelect=true
        }
      })
    });
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(
        rows.map(r => r.rowIdx)
      )
    });
    var unique = Array.from(new Set(rowsSeleccionadas)); // [1,2,3,4,5]
    this.props.onResults(unique)
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
    console.log("ROW DESELECT", rows);
    //rowsSeleccionadas.map(ss => num * 2).filter(num => num > 5);
    rowsSeleccionadas.map((valor1)=>{
      rows.map((row)=>{
        if(row.row.id == valor1.id){
          valor1.isSelect=false
        }
      })
    });


    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
    this.props.onResults(rowsSeleccionadas)
  }
  _montarRespuesta = (seleccionados, arrRows) =>{
    var arrResp = []
    seleccionados.forEach(function(index){
      arrResp.push(arrRows[index])
    })
    //this.props.onResults(arrResp)
  }
  render() {
    //const rowText = this.state.selectedIndexes.length === 1 ? 'row' : 'rows';
    console.log("ROW RENDER", this.state.selectedIndexes);
    console.log("ROW RENDER 2", this.state._rows);
    //this._montarRespuesta(this.state.selectedIndexes, this._rows)
    return  (
      <div>
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
        minHeight={500}
        minWidth={400} />
      </div>);
  }
}
