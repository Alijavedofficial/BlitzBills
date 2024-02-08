import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  public clientName:string = '';
  public clientEmail:string = '';
  public contactPerson:string = '';
  public quantity: number = 0;
  public unitPrice: number = 0;
  public vatPercentage: number =0;
  public vatAmount: number =0;
  public grossTotal: any = 0;
  public name: string = '';
  public date: string = '';
  public dueDate: string = '';
  public exchangeRate: any = 0;
  public currency:any = 0 ;
  public currencySymbol:any = '';
  public notes: string = '';
  public calculateTotal:any = 0;
  public totalQuantity:any = 0;
 selectedValues : any = {};
 selectedProducts: any = {};
  public companyName:any = '';
  public companyOwner:any = '';
 selectedCurrency: string = 'USD';

 private rowValues = new BehaviorSubject<any[]>([]);
 rowValues$ = this.rowValues.asObservable();

 updateRowValues(values: any[]) {
   this.rowValues.next(values);
 }


 private signaturesSubject = new BehaviorSubject<string[]>([]);
  signatures$ = this.signaturesSubject.asObservable();

  addSignature(signature: string): void {
    const currentSignatures = this.signaturesSubject.value;
    const updatedSignatures = [...currentSignatures, signature];
    this.signaturesSubject.next(updatedSignatures);
  }


}