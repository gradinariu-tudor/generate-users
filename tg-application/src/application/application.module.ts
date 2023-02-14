import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationComponent } from './application.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    MatTableModule,
    BrowserModule,
    MatDialogModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
  declarations: [ApplicationComponent],
  bootstrap: [ApplicationComponent],
})
export class ApplicationModule {}
