import React, { Component } from 'react';
import MaterialTable from 'material-table';

export default class CreateSimulationRecipeTable extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        { title: 'Recipe', field: 'recipe' },
        { title: 'Ingredients', field: 'ingredients' },
      ],
      data: [
        {
          recipe: 'Recipe 1',
          ingredients: ['Bloody Mary', 'White Russian', 'Sangria'],
        },
        {
          recipe: 'Recipe 2',
          ingredients: ['Mudslide', 'Gin Tonic', 'Hurricane', 'Sex on the Beach'],
        },
        {
          recipe: 'Recipe 3',
          ingredients: ['Mint & Melon Punch', 'Long Island Iced Tea', 'Sangria'],
        },
        {
          recipe: 'Recipe 4',
          ingredients: ['Mudslide', 'Gin Tonic', 'Hurricane', 'Sex on the Beach', 'Margarita'],
        },
        {
          recipe: 'Recipe 5',
          ingredients: ['Cosmopolitan', 'Mojito', 'Piña Colada'],
        },
        {
          recipe: 'Recipe 6',
          ingredients: ['Mudslide', 'Gin Tonic', 'Old Fashioned', 'Sex on the Beach'],
        },
      ],
    }
  }

  render() {
    var parent = this;
    return (
      <div className="ml-4 mr-4 mt-3 mb-0">
        <MaterialTable
          title="Selected Recipes"
          columns={this.state.columns}
          data={this.state.data}
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