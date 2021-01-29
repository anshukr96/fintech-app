import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardDetailService } from '../services/card-detail.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Card from '../store/action';
import { Router } from '@angular/router';
import {
  AMOUNTREGEX,
  CARDNAMEREGEX,
  CARDREGEX,
  EXPIRYREGEX,
} from '../Constants/Constants';
import { SnackbarService } from '../services/snackbar.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public cardForm: FormGroup;
  public isSubmitted: boolean = false;
  private destroy$$: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public cardService: CardDetailService,
    public snackbar: SnackbarService,
    public store: Store<any>
  ) {}

  ngOnInit(): void {
    this.buildCardForm();
  }

  buildCardForm() {
    this.cardForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(CARDNAMEREGEX)]],
      number: [
        null,
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      valid: [null, [Validators.required, Validators.pattern(EXPIRYREGEX)]],
      amount: [null, [Validators.required, Validators.pattern(AMOUNTREGEX)]],
      cvv: [null, [Validators.maxLength(3), Validators.minLength(3)]],
    });
  }

  storeCardDetails(cardDetails) {
    this.snackbar.openSnackbar('Successfully card details are saved!!');
    this.store.dispatch(new Card.AddCardDetails(cardDetails));
  }

  getValidityError() {
    return this.cardForm.get('valid').hasError('required')
      ? 'Field is required'
      : this.cardForm.get('valid').hasError('pattern')
      ? 'Not a valid expiry date. Please enter in this format 01/20'
      : null;
  }

  getCardNameError() {
    return this.cardForm.get('name').hasError('required')
      ? 'Field is required'
      : this.cardForm.get('name').hasError('pattern')
      ? 'Please enter valid card holder name'
      : null;
  }

  getCardNumberError() {
    return this.cardForm.get('number').hasError('required')
      ? 'Field is required'
      : this.cardForm.get('number').hasError('maxlength') ||
        this.cardForm.get('number').hasError('minlength')
      ? 'Please enter 16 digit card number'
      : null;
  }

  getAmountError() {
    return this.cardForm.get('amount').hasError('required')
      ? 'Field is required'
      : this.cardForm.get('amount').hasError('pattern')
      ? 'Please enter valid amount'
      : null;
  }

  getCvvError() {
    return this.cardForm.get('cvv').hasError('maxlength') ||
      this.cardForm.get('cvv').hasError('minlength')
      ? 'Please enter only 3 digit'
      : null;
  }

  pay() {
    const requestBody = {
      number: this.cardForm.controls['number'].value,
      name: this.cardForm.controls['name'].value,
      expiry: this.cardForm.controls['valid'].value,
      cvv: this.cardForm.controls['cvv'].value,
      amount: this.cardForm.controls['amount'].value,
    };

    this.cardService
      .saveCardDetail(requestBody)
      .pipe(
        takeUntil(this.destroy$$) // for auto unsubscribe to prevent memory leak
      )
      .subscribe(
        (cardDetails) => {
          console.log(cardDetails);
        },
        (err) => {
          console.log(err);
        }
      );

    this.storeCardDetails(requestBody);
    this.router.navigateByUrl('/home');
  }
}
