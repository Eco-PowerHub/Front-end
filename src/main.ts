import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {  OnInit } from '@angular/core';


import 'alpinejs';



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
