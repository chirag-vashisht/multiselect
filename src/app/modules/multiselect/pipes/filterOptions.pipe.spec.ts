import { FilterOptionsPipe } from './filterOptions.pipe';

describe(`filterOptions.Pipe`, () => {
    let filterOptionsPipe: FilterOptionsPipe;
    beforeAll(() => {
        filterOptionsPipe = new FilterOptionsPipe();
    });
    it('It should have a tranform method', () => {
        expect(filterOptionsPipe.transform).toBeDefined();
        expect(filterOptionsPipe.transform.length).toEqual(2);
    });
    it('It should filter array of items of type IDropdownItem', () => {
        expect(filterOptionsPipe.transform).toBeDefined();
        expect(filterOptionsPipe.transform.length).toEqual(2);
    });
    it('It should filter array of items of type IDropdownItem', () => {
        const items = [
            {
                id: 1,
                label: 'CandyEat',
                selected: false,
            },
            {
                id: 2,
                label: 'OnionsPick',
                selected: false,
            },
            {
                id: 3,
                label: 'FannyDuck',
                selected: false,
            },
            {
                id: 4,
                label: 'Click-o-Wisp',
                selected: false,
            }
        ];
        const filtered = filterOptionsPipe.transform(items, 'Fanny');
        expect(filtered).toEqual([{
            id: 3,
            label: 'FannyDuck',
            selected: false,
        }]);
    });
    it('It should not filter array of items if filter length is less than 3', () => {
        const items = [
            {
                id: 1,
                label: 'CandyEat',
                selected: false,
            },
            {
                id: 2,
                label: 'OnionsPick',
                selected: false,
            },
            {
                id: 3,
                label: 'FannyDuck',
                selected: false,
            },
            {
                id: 4,
                label: 'Click-o-Wisp',
                selected: false,
            }
        ];
        const filtered = filterOptionsPipe.transform(items, 'Fa');
        expect(filtered).toEqual(items);
    });
});
