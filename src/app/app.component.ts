import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { AutoCompleteComponent } from './custom-ag-grid/autocomplete/autocomplete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public gridOptions: GridOptions;

  constructor() {
    this.gridOptions = <GridOptions> {
      rowData: this.createRowData(),
      columnDefs: this.createColumnDefs(),
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      rowHeight: 30,
      frameworkComponents: {
        autocompleteEditor: AutoCompleteComponent
      }
    }
  }

   private createColumnDefs() {
     return [
      { headerName: 'Make', field: 'make' },
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price' },
      { headerName: 'Custom', field: 'custom', cellEditor: 'autocompleteEditor', cellEditorParams: {
        values: ["Java", "R", "JavaScript", "AWS", "Angular", "React", "OS", "Perl", "HTML", "CSS"]
      }, editable: true }
    ];
}

  private createRowData() {
    return [
      { make: 'Toyota', model: 'Celica', price: 35000},
      { make: 'Ford', model: 'Mondeo', price: 32000},
      { make: 'Porsche', model: 'Boxter', price: 72000}
    ];
  }
}
