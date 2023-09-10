import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService{

    startedEditing = new Subject<number>();

    ingredientsChanged = new Subject<Ingredient[]>();  
    newIngredientCreated = new EventEmitter<Ingredient>();

    ingredients: Ingredient[]= [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];
    
    getIngredients(){
        return this.ingredients;
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;

    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
    }
}