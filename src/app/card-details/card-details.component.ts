import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeAll, switchMap, tap } from 'rxjs/operators';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  constructor(private store: Store<any>, public router: Router) {}
  public card$$: Observable<Card>;
  ngOnInit(): void {
    this.card$$ = this.store.select('card').pipe(
      tap((items) => console.log(items)),
      mergeAll()
    );
  }

  onPayment() {
    this.router.navigate(['payment']);
  }
}
