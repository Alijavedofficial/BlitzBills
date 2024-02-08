import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,AbstractControl
} from '@angular/forms';
import { debounceTime, map, startWith,switchMap } from 'rxjs';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { SignatureDialogComponent } from '../signature-dialog/signature-dialog.component';
import { SignaturePadComponent } from '@almothafar/angular-signature-pad';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent implements OnInit {
  //property initialization

  product: any;
  clientName: string = '';
  contactPerson: string = '';
  shippingAddress: string = '';
  clientEmail: string = '';
  shippingAddressType: string = '';
  date: string = '';
  dueDate: string = '';
  referenceCode: string = '';
  grossTotal: number = 0;
  exchangeRate: any = 0;
  vatType: string = '';
  assignTo: string = '';
  sku: string = '';
  name: string = '';
  category: string = '';
  quantity: any = 0;
  unitPrice: any = '';
  vatPercentage: any = '';
  showProductForm: boolean = false;
  vatAmount: number = 0;
  notes: string = 'Custom Invoice Note Added from Settings.';
  filteredClients: any[] = [];
  clientSearchControl = new FormControl();
  filteredProducts: any[] = [];
  productSearchControl = new FormControl();
  fieldActive: boolean = false;
  // Getting Currencies,their symbols and Shorthands

  selectedCurrency: string = 'USD';
  currencies: { name: string; symbol: string; short: string }[] = [
    { name: 'United States Dollar | $', symbol: '$', short: 'USD' },
    { name: 'Euro | €', symbol: '	€', short: '	EUR' },
    { name: 'British Pound Sterling | GBP', symbol: '£', short: 'GBP' },
    { name: 'Japanese Yen | ¥', symbol: '¥', short: 'JPY' },
    { name: 'Australian Dollar | AU$', symbol: 'AU$', short: 'AUD' },
    { name: 'Canadian Dollar | CA$', symbol: 'CA$', short: 'CA$' },
    { name: 'Chinese Yuan | ¥', symbol: '¥', short: 'CY' },
    { name: 'Indian Rupee | ₹', symbol: '	₹', short: 'INR' },
    { name: 'Pakistani Rupee | Rs', symbol: 'Rs', short: 'PKR' },
  ];

  getCurrencySymbol(): string {
    const selectedCurrencyObj = this.currencies.find(
      (currency) => currency.symbol === this.selectedCurrency
    );

    return selectedCurrencyObj ? selectedCurrencyObj.symbol : '';
  }
  getCurrencyShort(): string {
    const selectedCurrencyObj = this.currencies.find(
      (currency) => currency.symbol === this.selectedCurrency
    );

    return selectedCurrencyObj ? selectedCurrencyObj.short : '';
  }

  //Constructor

  constructor(
    public dataService: DataService,
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog:MatDialog
  ) {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.email]],
      clientAddress: ['', Validators.required],
      contactPerson: ['', Validators.required],
      vatNumber: [''],
      registrationNumber: [''],
      telNumber: [''],
      companyName: ['', Validators.required],
      companyOwner: ['',Validators.required],
      date: ['', Validators.required],
      duedate: ['', Validators.required],
      purchaseReference: ['', Validators.required],
      currency: [''],
      exchangeRate: ['', Validators.required],
    });

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      unitPrice: [, Validators.required],
      category: [''],
      sku: ['', [Validators.required]],
      quantity: [, Validators.required],
      vatPercentage: [, Validators.required],
      vatAmount: [0],
      grossTotal: [0],
    });

    this.dueDate = this.formatDate(new Date());
    this.date = this.formatDate(new Date());

    this.clientForm.valueChanges.subscribe((values) => {
      this.dataService.selectedValues = values;
    });

    this.productForm.valueChanges.subscribe((values) => {
      this.dataService.selectedProducts = values;
    });
    
    
  }

  // Using Service (dataService)

  public buttonClick(): void {
    this.dataService.clientEmail = this.clientEmail;
    this.dataService.contactPerson = this.contactPerson;
    this.dataService.date = this.date;
    this.dataService.dueDate = this.dueDate;
    this.dataService.exchangeRate = this.exchangeRate;
    this.dataService.name = this.name;
    this.dataService.quantity = this.quantity;
    this.dataService.unitPrice = this.unitPrice;
    this.dataService.vatPercentage = this.vatPercentage;
    this.dataService.vatAmount = this.vatAmount;
    this.dataService.grossTotal = this.grossTotal;
    this.dataService.notes = this.notes;
    this.dataService.calculateTotal = this.calculateTotal();
    this.dataService.currencySymbol = this.getCurrencySymbol();
    this.dataService.totalQuantity = this.getTotalQuantity();
    
    this.onSubmit();
  }
  // Toggling the Product Form

  toggleProductForm(): void {
    this.showProductForm = !this.showProductForm;
    if (this.rows.length < 1) {
      this.showProductForm = true;
    }
  }

  resetValues(): void {
    window.location.reload();
  }

  // Getting CLients and Products from Json and showing their other information related to selection of clients

  client: any;
  clientForm!: FormGroup;
  clients: any[] = [];
  rows: FormGroup[] = [];
  clientControl = new FormControl();
  companies: any[] = [];
  ngOnInit(): void {
    this.http.get<any>('assets/clients.json').subscribe((data) => {
      this.clients = data.clients;
    });

    this.http.get<any>('assets/clients.json').subscribe((data) => {
      this.products = data.products;
    });

    this.http.get<any>('assets/clients.json').subscribe((data) => {
      this.companies = data.companies;
    })
    this.addRow();
    this.setupClientSearch();
    this.rows.forEach((row: FormGroup) => {
      this.setupProductSearch(row);
    });

    // Set the initial value to the first currency in the array
    this.selectedCurrency =
      this.currencies.length > 0 ? this.currencies[0].symbol : '';
      
  }

  onClientNameChange() {
    const selectedClient = this.clients.find(
      (client) => client.name === this.clientForm.value.clientName
    );

    this.clientForm.patchValue({
      clientEmail: selectedClient?.email || '',
      clientAddress: selectedClient?.address || '',
      contactPerson: selectedClient?.contactPerson || '',
      currency: selectedClient?.currency || '',
      vatNumber: selectedClient?.vatNumber || '',
      registrationNumber: selectedClient?.registrationNumber || '',
      telNumber: selectedClient?.telNumber || '',
      exchangeRate: selectedClient?.exchangeRate || '',
      shippingAddressType: selectedClient?.shippingAddressType || '',
    });
  }

  onSubmit() {
    console.log('form submitted');
  }

  productForm: FormGroup;
  products: any[] = [];
  invoiceDetail:FormGroup;
  invoices: any[] = [];

  //Patching values of SKU and Unit Price on selection of Product name

  onProductChange(row: FormGroup) {
    const selectedProductName = row.get('productName')?.value;
    const selectedProduct = this.products.find(
      (product) => product.name === selectedProductName
    );

    if (selectedProduct) {
      row.patchValue({
        unitPrice: selectedProduct.unitPrice || 0,
        sku: selectedProduct.sku || '',
      });
    }
  }

  // Adding and Deleting Product Form rows

  addRow() {
    const newRow = this.fb.group({ ...this.productForm.value });

    this.rows.push(newRow);
    newRow.addControl(
      'setupProductSearch',
      this.fb.control(() => this.setupProductSearch(newRow))
    );
    newRow.addControl(
      'onProductChange',
      this.fb.control(() => this.onProductChange(newRow))
    );

    newRow.valueChanges.subscribe(() => {
      this.calculateRow(newRow);
      this.updateSharedService();
    });
  }





  deleteRow(index: number) {
    this.rows.splice(index, 1);
    this.updateSharedService();
    if (this.rows.length < 1) {
      this.showProductForm = !this.showProductForm;
    }
  }

  //Calculations for gross Total and Total Amount

  calculateRow(row: FormGroup) {
    const quantity = row.get('quantity')?.value;
    const unitPrice = row.get('unitPrice')?.value;
    const vatPercentage = row.get('vatPercentage')?.value;

    const vatAmount = (quantity * unitPrice * vatPercentage) / 100;
    const grossTotal = quantity * unitPrice + vatAmount;

    row.patchValue({
      vatAmount: vatAmount,
      grossTotal: grossTotal,
    });
  }
  calculateTotal() {
    return this.rows.reduce(
      (total, row) => total + row.get('grossTotal')!.value,
      0
    );
  }
  getTotalQuantity(): number {
    return this.rows.reduce(
      (total, row) => total + row.get('quantity')!.value,
      0
    );
  }

  setupClientSearch(): void {
    this.clientSearchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map((value) => this.filterClients(value))
      )
      .subscribe((filteredClients) => {
        this.filteredClients = filteredClients;
      });
  }

  setupProductSearch(row: FormGroup): void {
    this.productSearchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map((value) => this.filterProducts(value))
      )
      .subscribe((filteredProducts) => {
        this.filteredProducts = filteredProducts;
      });
  } 


  filterClients(value: string): any[] {
    const filterValue = value.toLowerCase().trim();

    // Only display clients when the user types at least one characters

    if (filterValue.length < 1) {
      return [];
    }

    return this.clients.filter((client) =>
      client.name.toLowerCase().includes(filterValue)
    );
  }

  filterProducts(value: string): any[] {
    const filterValue = value.toLowerCase().trim();

    // Only display products when the user types at least one characters

    if (filterValue.length < 1) {
      return [];
    }

    return this.products.filter((product) =>
      product.name.toLowerCase().includes(filterValue)
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  private updateSharedService() {
    this.dataService.updateRowValues(this.rows.map((row) => row.value));
  }

  openSignatureDialog(): void {
    const dialogRef = this.dialog.open(SignatureDialogComponent);

    dialogRef.componentInstance.clearSignature.subscribe(() => {
      
    });

    dialogRef.componentInstance.addSignature.subscribe((signatureData: string) => {
      
      this.dataService.addSignature(signatureData);
    });
  }
}
