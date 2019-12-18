import React, { Component } from 'react';
import MaterialTable from 'material-table';

export default class VuewMySimulationsUsersTable extends Component {
  constructor() {
    super();
  }

  render() {
    var parent = this;
    let columns = [
      { title: 'User Name', field: 'userName' },
      { title: 'Score', field: 'score' },
    ];
    return (
        <div className="ml-4 mr-4 mt-3 mb-0">
          <MaterialTable
              title="Who Complete the Simulation?"
              columns={columns}
              data={this.props.selected}
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
                pageSize: 10,
              }}
          />
        </div>
    );
  }
}