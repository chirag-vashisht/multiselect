/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import {
  IDropdownItem,
  IMultiselectConfig
} from './modules/multiselect';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public name = 'Demo';
  public dropdownModel: IDropdownItem[];
  public selectedGames: IDropdownItem[];
  public multiSelectOptions: IMultiselectConfig;

  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    this.multiSelectOptions = {
      searchBoxPlaceHolder: 'Search for games',
      defaultButtonText: 'Games',
    };
    this.dropdownModel = [
      {
        id: 1,
        label: 'CandyEat',
        selected: false, // optional
      },
      {
        id: 2,
        label: 'OnionsPick',
        selected: false, // optional
      },
      {
        id: 3,
        label: 'FannyDuck',
        selected: false, // optional
      },
      {
        id: 4,
        label: 'Click-o-Wisp',
        selected: false, // optional
      }
    ];
  }

  public onChange(event: Event) {
    this.selectedGames = this.dropdownModel.filter((item) => item.selected);
    console.log(this.selectedGames);
  }
}
