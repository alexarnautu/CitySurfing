import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 
@Injectable()
export class StyleService {
 
  private layoutStyle = new Subject<string>();
 
  // Observable string streams
  layoutStyle$ = this.layoutStyle.asObservable();
 
  // Service message commands
  setStyle(style: string) {
    this.layoutStyle.next(style);
  }
}