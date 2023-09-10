import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  @Input() recipe: Recipe;  
  @Input() index:number;
  constructor(private recipesService: RecipeService){}
  id:number;
  ngOnInit(): void {
    
  }
}
