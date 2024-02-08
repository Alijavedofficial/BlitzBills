import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signature-dialog',
  templateUrl: './signature-dialog.component.html',
  styleUrl: './signature-dialog.component.css'
})
export class SignatureDialogComponent {
  @ViewChild(SignaturePad,{ static: true }) signaturePad!: SignaturePad;
  @Output() clearSignature = new EventEmitter<void>();
  @Output() addSignature = new EventEmitter<string>();

  signaturePadOptions: any = { 
    minWidth: 2,
    canvasWidth: 200,
    canvasHeight: 150
  };
 
  
  onClear(): void {
    this.signaturePad.clear();
    this.clearSignature.emit();
  }

  onAdd(): void {
    const signatureData = this.signaturePad.toDataURL();
    this.addSignature.emit(signatureData);
  }

}
