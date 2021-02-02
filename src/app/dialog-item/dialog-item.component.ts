import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewItem } from './../interfaces/newItem.interface';
import * as EventEmitter from 'events';


@Component({
  selector: 'app-dialog-item',
  templateUrl: './dialog-item.component.html',
  styleUrls: ['./dialog-item.component.css']
})
export class DialogItemComponent implements OnInit {

  @Output() dataChanged = new EventEmitter();
  itemForm: FormGroup;
  

  constructor(
    public dialogRef: MatDialogRef<DialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data.type === 'new') {
      this.initNewItemForm(this.data);
    } else if (this.data.type === 'edit') {
      this.initExistingItem(this.data);
    }
  }

  initNewItemForm(item: NewItem) {
    console.log(item);
    this.itemForm = this.fb.group({
      title: new FormControl(item.title, Validators.required),
      description: new FormControl(item.description, Validators.required),
      done: false, 
    })
  }

  initExistingItem(item) {
    this.itemForm = this.fb.group({
      id: item.data.id,
      title: item.data.title,
      description: item.data.description,
      created: item.data.created,
      done: item.data.done
    })
  }

 
  submitAdd() {
    console.log('sumbit add')
    const data = {
      data: this.itemForm.value,
      type: this.data.type,
    };
    console.log(this.itemForm.value);
      this.dialogRef.close(this.itemForm.value);
    
  }


  submitExistingItem() {
    const data = {
      data: this.itemForm.value,
      type: this.data.type,
      index: this.data.index
    };
    this.dialogRef.close(data);
  }


  cancelDialog() {
    this.dialogRef.close(null);
  }
}
