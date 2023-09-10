import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  id:number;
  recipe: Recipe;
  constructor(private recipesService: RecipeService, private route: ActivatedRoute, private router: Router){}
  SendToShoppingList(){
    this.recipesService.addToShoppingList(this.recipe.ingredients)
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {this.id = +params['id'];
      this.recipe = this.recipesService.getRecipebyID(this.id);}
    )
  }

  onDeleteRecipe(){
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }


}
