import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { map } from 'rxjs/operators';
import { ItemAPI } from '../urls/items';
import { NewItem } from '../interfaces/newItem.interface';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogItemComponent } from './../dialog-item/dialog-item.component';
import { MatTable } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { existingItem } from '../interfaces/existingItem.interface';


@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.css'],
})
export class TodoMainComponent implements OnInit {


  @ViewChild('itemsTable', {static: false}) itemsTable: MatTable<any>;
  items$ = new BehaviorSubject([]);
  dataSource: any = [];

  displayedColumns = [
    'title',
    'description',
    'createdDate',
    'complete',
    'action',  
  ];

  constructor(
    private itemService: ItemsService,
    private dialogBox: MatDialog,
    private changeDectorRef: ChangeDetectorRef) {
    }

  ngOnInit() {
    this.itemService.getAllItems().subscribe(res => {
      this.dataSource = res;
    })
  }

  editItem(index, item) {
    const data = {
      data: item,
      type: 'edit',
      index
    };

    const dialogRef = this.dialogBox.open(DialogItemComponent, {  data, width: '350px'  });

    dialogRef.afterClosed().subscribe(result => {
       if (result !== null) {
          this.dataSource[result.index] = result.data;
          this.itemsTable.renderRows();
          this.itemService.updateItem(result.data).subscribe(data => {
            // console.log(data);
          });
       }
    });
  }

  createNewItem() {
    const data = {
      data: null,
      type: 'new',
    };

    const dialogRef = this.dialogBox.open(DialogItemComponent, {  data, width: '350px'  });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        this.itemService.createNewItem(result).subscribe(data => {
          this.addRowData(data);
        });
      }
      
   });
  }

  removeItem(item) {
    this.itemService.removeItem(item.id).subscribe(data => {
      this.deleteRowData(item);
    });
    
  }

  addRowData(item){
    this.dataSource.push({
      title: item.title,
      description: item.description,
      created: item.created,
      done: item.done
    });
    this.itemsTable.renderRows();
  }

  deleteRowData(item) {
    this.dataSource = this.dataSource.filter((value,key) => {
      return value.id != item.id;
    });
  }

  completeItem(event, item) {
    item.done = event.checked;
    this.itemService.updateItem(item).subscribe(data => {
      // console.log(data);
    });

  }
  


}
