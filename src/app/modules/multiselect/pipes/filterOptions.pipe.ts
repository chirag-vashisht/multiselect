import { Pipe, PipeTransform } from '@angular/core';

import { IDropdownItem } from '../interfaces/dropdown-item.interface';

/**
 * Pipe for filtering dropdown options
 *
 * @export
 * @class FilterOptionsPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'filterOptions' })
export class FilterOptionsPipe implements PipeTransform {
    public transform(items: IDropdownItem[], filter: string) {
        if (filter && filter.length > 2) {
            return items.filter((item) => item.label.toLowerCase()
                .indexOf(filter.toLowerCase()) > -1);
        }
        return items;
    }
}
