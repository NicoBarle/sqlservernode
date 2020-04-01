import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obsUnit: Observable<Unit[]>;
  data: Unit[];

  postObserver : Observable<Object>;
  postData : Object;

  constructor(private http: HttpClient) { }


  getUnitList(): void {
    this.obsUnit = this.http.get<Unit[]>('https://3000-ce090fd3-7dee-4221-a47a-a852e087ce8f.ws-eu01.gitpod.io/users');
    this.obsUnit.subscribe((data: Unit[]) => {this.data = data;});
  }

addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement): boolean {
    //DOMANDA 8
    //SE USIAMO IL COSTRUTTORE, newData cambierà in questo modo
    let newData: Unit = new Unit();   //al posto di questa scrittura, scriviamo let newData = new Unit(newUnit.value, newCost.value, newHitSpeed.value)
    newData.Unit = newUnit.value;
    newData.Cost = newCost.value;
    newData.Hit_Speed = newHitSpeed.value;
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-ce090fd3-7dee-4221-a47a-a852e087ce8f.ws-eu01.gitpod.io/aggiungi', JSON.stringify(newData),headers)
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }

}

