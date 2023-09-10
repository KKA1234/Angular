import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    recipeSelected = new EventEmitter<Recipe>();
    toAddtoSL = new EventEmitter<Ingredient>();

    // private recipes: Recipe[] = [
    //     new Recipe(' Amazing Biryani', 'This is biryani', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/330px-%22Hyderabadi_Dum_Biryani%22.jpg', [
    //         new Ingredient('Rice', 10),
    //         new Ingredient('Spices', 20)
    //     ]),
    
    //     new Recipe('Idli', 'The idli of all time', 'https://img.etimg.com/thumb/msid-99118050,width-650,height-488,imgsize-64776,,resizemode-75/idli_istock.jpg', [
    //         new Ingredient('Urad dal', 15),
    //         new Ingredient('salt', 5)
    //     ])
    //   ];
    recipes : Recipe[] = [];

    getRecipes(){
        return this.recipes.slice();
    }

    constructor(private shoppinglistServices: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addToShoppingList(ingredients: Ingredient[]){
        this.shoppinglistServices.addIngredients(ingredients);
    }

    getRecipebyID(id: number){
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }
    
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number)
    {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}