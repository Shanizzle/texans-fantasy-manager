import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { map } from 'rxjs/operators';
import { ItemAPI } from '../urls/items';
import { NewItem } from '../interfaces/newItem.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.css'],
})
export class TodoMainComponent implements OnInit {

  model = {
    title: 'Head Coach',
    description: 'Find a new head coach',
    done: false
  }
  
  itemList$: Observable<any> = this.itemService.getAllItems();
  allItems$ = this.itemList$.pipe(
    map((items: any) => {
      console.log(items);
      return items
    })
  );

  constructor(
    private itemService: ItemsService
  ) { }

  ngOnInit(): void {
  }

  

  createNewItem() {
   let newModel = this.model;
    this.itemService.createNewItem(newModel).pipe(
      map((res: any) => {
        console.log(res);
      })
    ).subscribe(data => {
      //show new item
    })
  }

  

}
