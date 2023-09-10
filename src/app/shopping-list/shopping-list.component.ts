import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];

  constructor(private shoppinglistService: ShoppingListService, private loggingService: LoggingService){}

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.loggingService.printlog('Hello from ShoppingList Component ngOnInit');
  }

  onEditItem(index: number){
    this.shoppinglistService.startedEditing.next(index);
  }

}