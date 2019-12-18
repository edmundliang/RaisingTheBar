import React, { Component } from 'react';
import MaterialTable from 'material-table';

export default class CreateSimulationRecipeTable extends Component {
  constructor() {
    super();
  }

  render() {
    var parent = this;
    let columns = [
      { title: 'Name', field: 'name' }
    ];
    return (
      <div className="ml-4 mr-4 mt-3 mb-0">
        <MaterialTable
          title="Selected Recipes"
          columns={columns}
          data={this.props.selected}
          editable={{
            onRowDelete: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  let newList = parent.props.selected;
                  newList.splice(newList.indexOf(oldData), 1);
                  parent.setState({selected : newList});                  
                  resolve();                  
                }, 600);
              }),
          }}
          options={{
            headerStyle: {
              fontWeight: 'bold',
              padding: '1rem',
              fontSize: '1rem',
              backgroundColor: "#f0f0f0",
            },
            rowStyle: {
              padding: '1rem',
            },
            actionsCellStyle: {
              color: '#d93636',
            },
            actionsColumnIndex: 2,
            draggable: 0,
            paging: 5,
            pageSizeOptions: 0,
          }}
        />
      </div>
    );
  }
}