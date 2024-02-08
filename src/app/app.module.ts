import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe } from '@angular/common';
import { DataService } from './data.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignatureDialogComponent } from './signature-dialog/signature-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    ClientDetailComponent,
    HomeComponent,
    LoginDialogComponent,
    InvoiceFormComponent,
    SignatureDialogComponent,
    NavbarComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    CurrencyPipe,
    QRCodeModule,
     ReactiveFormsModule,
     BrowserAnimationsModule,
     MatFormFieldModule,
     MatAutocompleteModule,
     MatIconModule,
     MatDialogModule,
     MatButtonModule,
     AngularSignaturePadModule,
     MatToolbarModule,
   
  ],
       providers: [DataService],
  bootstrap: [AppComponent],

})
   
 
export class AppModule {}
