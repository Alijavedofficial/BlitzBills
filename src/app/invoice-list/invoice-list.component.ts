
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';



@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent {
  
  selectedCurrency: string = 'USD';
  constructor(public dataService:DataService) {}
  rowValues: any[] = [];
  get selectedValues() {
    return this.dataService.selectedValues;
  }
  get selectedProducts() {
    return this.dataService.selectedProducts;
  }
 
  ngOnInit() {
    this.dataService.rowValues$.subscribe(values => {
      this.rowValues = values;
    });
  }

  printDocument(): void {
    window.print(); // Invoke the browser's print functionality
  }

 
  
}

