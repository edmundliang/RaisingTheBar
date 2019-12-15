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
    ]
    return (
      <div className="ml-4 mr-4 mt-3 mb-0">
        <MaterialTable
          title="Selected Recipes"
          columns={columns}
          data={this.props.selected}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  parent.setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
          options={{
            headerStyle: {
              fontWeight: 'bold',
              padding: '1rem',
              fontSize: '1rem',
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