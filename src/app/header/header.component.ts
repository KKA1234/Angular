import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor( private http: HttpClient, private dataStorageService: DataStorageService, private authService: AuthService){}

  isAuthenticated = false;
  private userSub: Subscription;


  ngOnInit(): void {
    this.userSub =  this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });

  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
