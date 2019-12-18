import React, { Component } from 'react';
import MaterialTable from 'material-table';

export default class VuewMySimulationsUsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulationResults: []
    }

    if (props.selected != null) {
      // var xhr = new XMLHttpRequest();
      // xhr.open('POST', '/simulation/grade');
      // var formData = new FormData()
      // formData.append("id", props.selected.id);
      // var globalThis = this
      // xhr.onload = function () {
      //   if (this.status === 200) {

      //     var simulationResults = this.state.simulationResults;
      //     var gottenResults = JSON.parse(this.responseText).grades;
      //     for (var x of gottenResults) {

      //       var xhr = new XMLHttpRequest();
      //       xhr.open('POST', '/simulation/grade');
      //       var secondFormData = new FormData()
      //       secondFormData.append("id", props.selected.id);
      //       var globalThis = this
      //       xhr.onload = function () {
      //         if (this.status === 200) {

      //         }
      //       };
      //       xhr.send(formData);
      //     }
      //     globalThis.setState({ recipes: newList })
      //   } else {
      //     console.log("Got error response code " + this.status + " when trying to delete");
      //   }
      // };
      // xhr.send(formData);
    }
  }

  render() {
    var parent = this;
    let columns = [
      { title: 'User Name', field: 'email' },
      { title: 'Score', field: 'score' },
    ];
    return (
      <div className="ml-4 mr-4 mt-3 mb-0">
        <MaterialTable
          title="Who Complete the Simulation?"
          columns={columns}
          data={this.state.simulationResults }
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