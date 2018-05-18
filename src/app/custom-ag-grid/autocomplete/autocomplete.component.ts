import { Component, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'autocomplete',
    styleUrls: ['autocomplete.component.css'],
    templateUrl: 'autocomplete.component.html'
    
})
export class AutoCompleteComponent implements ICellEditorAngularComp {
    valueCtrl: FormControl;
    filteredValues: Observable<any[]>;

    private params: any;
    private values: string[];
    private selectedValue: string;
    private selectedIndex: number;

    @ViewChild("group", { read: ViewContainerRef })
    public group: any;
    
    agInit(params: any): void {
        this.params = params;
        this.selectedValue = this.params.value;
        this.values = this.params.values;
        console.log(this.values);
        this.selectedIndex = this.values.findIndex((item) => {
            return item === this.params.value;
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.group.element.nativeElement.focus();
            this.focusOnSelectedIndex();
        });
    }

    constructor() {
        this.valueCtrl = new FormControl();
        this.filteredValues = this.valueCtrl.valueChanges
            .pipe(
                startWith(''),
                map(val => val ? this.filterValues(val) : this.values.slice())
            )
    }

    filterValues(name: string) {
        console.log(this.values.filter(val => {
            //console.log('this is the place: ', val.toLowerCase().indexOf(val.toLowerCase()) === 0);
            val.toLowerCase().indexOf(val.toLowerCase()) === 0;
        }))
        return this.values.filter(val => {
            //console.log('this is the place: ', val.toLowerCase().indexOf(val.toLowerCase()) === 0);
            val.toLowerCase().indexOf(val.toLowerCase()) === 0;
        })
    }

    private focusOnSelectedIndex() {
        this.selectedValue = this.values[this.selectedIndex];
    }

    getValue(): any {
        return this.selectedValue;
    }

    onClick(selection: any) {
        this.selectedIndex = this.group.findIndex((item) => {
            return item === selection;
        });
        this.params.api.stopEditing();
    }

    onKeyDown(event): void {
        let key = event.which || event.keycode;
        if(key === 38 || key === 40) {
            event.preventDefault();
            event.stopPropagation();

            if(key == 38) {
                this.selectedIndex = this.selectedIndex === 0 ? (this.group.length - 1) : this.selectedIndex - 1;
            } else if(key == 40) {
                this.selectedIndex = (this.selectedIndex === this.group.length - 1) ? 0 : this.selectedIndex + 1;
            }
            this.focusOnSelectedIndex();
        }
    }
}