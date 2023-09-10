import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

  @Output() AddEvent = new EventEmitter<void>();
  AddClicked(){
    this.AddEvent.emit();
  }
  constructor(private shoppingListService: ShoppingListService){}
  // onAddItem(){
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.AddIngredient.emit(newIngredient); 
  // }

  ngOnInit(): void {
      this.subscription = this.shoppingListService.startedEditing.subscribe((index: number)=>{
      this.editMode=true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onAddItem(form: NgForm){
    const value=form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode)
    {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
