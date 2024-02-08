import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureDialogComponent } from './signature-dialog.component';

describe('SignatureDialogComponent', () => {
  let component: SignatureDialogComponent;
  let fixture: ComponentFixture<SignatureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignatureDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
