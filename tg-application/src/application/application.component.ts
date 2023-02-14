import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './tg-image-dialog/tg-image-dialog';

interface Result {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  thumbnail: string;
}

@Component({
  selector: 'tg-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationComponent implements OnInit, AfterViewInit {
  results: Result[] = [];
  sortedResults: Result[] = [];
  dataSource = new MatTableDataSource(this.results);
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'country', 'thumbnail'];

  public constructor(public dialog: MatDialog) {}

  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.results = JSON.parse(localStorage.getItem('results') || '[]');
    this.dataSource.data = this.results;
    this.dataSource.filterPredicate = (data: Result, filter: string) => {
      return data.country.trim().toLowerCase().indexOf(filter)!=-1;
     };
  }


  public getResultsFromApi() {
    fetch('https://randomuser.me/api/?results=250')
      .then((result): Promise<any> => {
        return result.json();
      })
      .then((data: any): void => {
        let rawResults: any[] = data.results;
        let currentData: Result[] = [];
        for (let rawResult in rawResults) {
          if (Object.prototype.hasOwnProperty.call(rawResults, rawResult)) {
            let result = rawResults[rawResult];
            currentData.push(this.getCleanedUser(result));
          }
        }
        this.dataSource.data = currentData;
        console.log('this.dataSource: ', this.dataSource);
      });
  }

  private getCleanedUser(user: any): Result {
    return {
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      country: user.location.country,
      thumbnail: user.picture.thumbnail,
    };
  }

  public getImage(image: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: image,
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
