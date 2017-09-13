import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';
import { MultiselectComponent } from './components';
import { FilterOptionsPipe } from './pipes/filterOptions.pipe';

/**
 * Module to import dependencies for use of MultiselectComponent
 *
 * @export
 * @class MultiselectModule
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BsDropdownModule.forRoot()
    ],
    declarations: [
        MultiselectComponent,
        FilterOptionsPipe,
    ],
    exports: [MultiselectComponent]
})
export class MultiselectModule { }
