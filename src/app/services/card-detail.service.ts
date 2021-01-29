import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class CardDetailService {
  public saveCardRoute() {
    return `${environment.apiUrl}/saveCard`;
  }
  constructor(public crud: CrudService) {}

  saveCardDetail(payload): Observable<any> {
    return this.crud.post(this.saveCardRoute(), payload);
  }
}
