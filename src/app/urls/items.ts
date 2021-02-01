import { Injectable } from "@angular/core";


@Injectable()
export class ItemAPI {
  private urlRoot;

  constructor() {
    this.urlRoot = 'https://todo-api.cogb.us';
  }

  

  GetItems() {
    return this.urlRoot + `/items/`;
  }

  ReadItem(item_id: string) {
    return this.urlRoot + `/items/${item_id}`;
  }

  UpdateItem(item_id: string) {
    return this.urlRoot + `/items/${item_id}`;
  }

  RemoveItem(item_id: string) {
    return this.urlRoot + `/items/${item_id}`;
  }

  CreateItem() {
    return this.urlRoot + `/items`;
  }


}