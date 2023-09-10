import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        // put request overwrites the data existing there
        this.http.put('https://real-kka-database-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => console.log(response));
    }

    fetchRecipes() {
          return this.http.get<Recipe[]>('https://real-kka-database-default-rtdb.firebaseio.com/recipes.json').pipe(
          map(recipes => {
          const recipesArray: Recipe[] = Object.values(recipes);
          return recipesArray.map(recipe => {
            console.log(recipe);
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
          console.log('Processed Recipes:', recipes); // Add this line
          this.recipesService.setRecipes(recipes);
        }))
      }
      
}
