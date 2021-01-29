import { Action } from '@ngrx/store';
import { Card } from '../models/card.model';

export enum CardActionTypes {
  ADD_CARD = 'ADD_CARD',
}

export class AddCardDetails implements Action {
  readonly type = CardActionTypes.ADD_CARD;
  constructor(public payload: Card) {}
}

export type CartActions = AddCardDetails;
