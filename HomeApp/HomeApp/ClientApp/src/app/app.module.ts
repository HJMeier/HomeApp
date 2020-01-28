import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

import { DataService } from './services/data-service';
import { TaskItemService } from './services/task-item.service';
import { AppErrorHandler } from './common/app-error-handler';
import { TaskStateComponent } from './components/task-state/task-state.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TaskItemComponent,
    TaskStateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'task-items', component: TaskItemComponent },
    ])
  ],
  providers: [
    TaskItemService,
    DataService,
    { provide: ErrorHandler, useClass: AppErrorHandler } // replaces globally ErrorHandler by AppErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
