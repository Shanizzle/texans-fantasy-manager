import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemAPI } from '../urls/items';
import { NewItem } from '../interfaces/newItem.interface';


@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  private headers = new HttpHeaders({ 
  'Content-Type': 'application/json;',
  'candidate-uuid': '48859e57-2610-47cd-8daa-d7c66c45acc9',
   });

  constructor(
    private http: HttpClient,
    private itemApi: ItemAPI
  ) {
    
  }

  getAllItems() {
    const url = this.itemApi.GetItems();
    return this.http.get(url, {headers: this.headers});
  }

  readOneItem(itemId: string) {
    const url =  this.itemApi.ReadItem(itemId);
    return this.http.get(url, {headers: this.headers});
  }

  // updateItem(itemId: string) {
  //   const url =  this.itemApi.UpdateItem(itemId);
  //   return this.http.put(url, JSON.stringify(model), {headers: this.headers});
  // }

  removeItem(itemId: string) {
    const url =  this.itemApi.RemoveItem(itemId);
    return this.http.get(url, {headers: this.headers});
  }

  createNewItem(model: NewItem) {
    console.log('In service' + model);
    const url = this.itemApi.CreateItem();
    return this.http.post(url, JSON.stringify(model), {headers: this.headers})
  }

}