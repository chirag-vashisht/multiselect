import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    inject,
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested
 */
import { MultiselectComponent } from './multiselect.component';
import { FilterOptionsPipe } from '../pipes/filterOptions.pipe';

describe(`multiselect.component`, () => {
    let comp: MultiselectComponent;
    let fixture: ComponentFixture<MultiselectComponent>;

    /**
     * async beforeEach
     */
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiselectComponent, FilterOptionsPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: []
        })
            /**
             * Compile template and css
             */
            .compileComponents();
    }));

    /**
     * Synchronous beforeEach
     */
    beforeEach(() => {
        fixture = TestBed.createComponent(MultiselectComponent);
        comp = fixture.componentInstance;

        /**
         * Trigger initial data binding
         */
        fixture.detectChanges();
    });
    describe(`Initialization`, () => {
        it(`Should be readly initialized`, () => {
            expect(fixture).toBeDefined();
            expect(comp).toBeDefined();
        });

        it('Should initialize items correctly if selected is not provided', () => {
            comp.cd.viewModel = [
                {
                    id: 1,
                    label: 'CandyEat'
                },
            ];
            comp.ngOnInit();

            expect(comp.cd.viewModel).toEqual([
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: false,
                },
            ]);
        });
        it('Should not make any change in view model if it is correctly declared', () => {
            comp.cd.viewModel = [
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: false,
                },
            ];
            comp.ngOnInit();

            expect(comp.cd.viewModel).toEqual([
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: false,
                },
            ]);
        });
    });
    describe(`Setting configuration`, () => {
        it('Should set configuation if "defaultButtonText" is provided', () => {
            comp.dropdownConfig = {
                defaultButtonText: 'Text',
            };
            comp.ngOnInit();
            expect(comp.config.buttonLabel).toEqual('Text');
        });
        it('Should set configuation if "allSelected" is option is provided', () => {
            comp.dropdownConfig = {
                allSelected: true,
            };
            comp.cd.viewModel = [
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: false,
                },
            ];
            comp.ngOnInit();
            expect(comp.config.allSelected).toEqual(true);
            expect(comp.cd.viewModel).toEqual([
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: true,
                },
            ]);
        });
        it('Should set configuation if "allSelected" is option is provided and is false', () => {
            comp.dropdownConfig = {
                allSelected: false,
            };
            comp.cd.viewModel = [
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: false,
                },
            ];
            comp.ngOnInit();
            expect(comp.config.allSelected).toEqual(false);
            expect(comp.cd.viewModel).toEqual([
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: false,
                },
            ]);
        });
        it('Should set configuation if "showCheckAll" is option is provided and is true', () => {
            comp.dropdownConfig = {
                showCheckAll: true,
            };
            comp.ngOnInit();
            expect(comp.config.showCheckAll).toEqual(true);
        });
        it('Should set configuation if "showUncheckAll" is option is provided and is true', () => {
            comp.dropdownConfig = {
                showUncheckAll: true,
            };
            comp.ngOnInit();
            expect(comp.config.showUncheckAll).toEqual(true);
        });
        it('Should set configuation if "maxInline" is option is provided', () => {
            comp.dropdownConfig = {
                maxInline: 3,
            };
            comp.ngOnInit();
            expect(comp.config.maxInline).toEqual(3);
        });
        it('Should set configuation if "buttonClasses" is option is provided', () => {
            comp.dropdownConfig = {
                buttonClasses: ['test', 'test1'],
            };
            comp.ngOnInit();
            expect(comp.config.buttonClasses).toEqual(['test', 'test1']);
        });
        it('Should set configuation if "checkClasses" is option is provided', () => {
            comp.dropdownConfig = {
                checkClasses: ['test', 'test1'],
            };
            comp.ngOnInit();
            expect(comp.config.checkClasses).toEqual(['test', 'test1']);
        });
        it('Should set configuation if "uncheckClasses" is option is provided', () => {
            comp.dropdownConfig = {
                uncheckClasses: ['test', 'test1'],
            };
            comp.ngOnInit();
            expect(comp.config.uncheckClasses).toEqual(['test', 'test1']);
        });
        it('Should set configuation if "scrollingHeight" is option is provided', () => {
            comp.dropdownConfig = {
                scrollingHeight: 200,
            };
            comp.ngOnInit();
            expect(comp.config.scrollingHeight).toEqual(200);
        });
        it('Should set configuation if "searchBoxPlaceHolder" is option is provided', () => {
            comp.dropdownConfig = {
                searchBoxPlaceHolder: 'Search text!',
            };
            comp.ngOnInit();
            expect(comp.config.searchBoxPlaceHolder).toEqual('Search text!');
        });
    });
    describe(`uncheckAll()`, () => {
        it('Should uncheck all checkboxes on calling', () => {
            comp.cd.viewModel = [
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: true,
                },
            ];
            comp.uncheckAll();
            expect(comp.cd.viewModel).toEqual([
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: false,
                },
            ]);
        });
    });
    describe(`toggleRow()`, () => {
        it('Should toggle selection on calling', () => {
            comp.cd.viewModel = [
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: true,
                },
            ];
            comp.toggleRow(comp.cd.viewModel[0]);
            expect(comp.cd.viewModel[0].selected).toEqual(false);
            comp.toggleRow(comp.cd.viewModel[0]);
            expect(comp.cd.viewModel[0].selected).toEqual(true);
        });
    });
    describe(`buttonLabel property`, () => {
        it('Should show defaultButtonText if no option is chosen', () => {
            comp.cd.viewModel = [
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: false,
                },
            ];
            comp.dropdownConfig = {
                defaultButtonText: 'Games',
            };
            comp.ngOnInit();
            expect(comp.buttonLabel).toEqual('Games');
        });
        it('Should show selected options with count', () => {
            comp.cd.viewModel = [
                {
                    id: 1,
                    label: 'CandyEat',
                    selected: true,
                },
                {
                    id: 2,
                    label: 'CandyEat1',
                    selected: false,
                }
            ];
            comp.dropdownConfig = {
                defaultButtonText: 'Games',
            };
            comp.ngOnInit();
            expect(comp.buttonLabel).toEqual('CandyEat');
        });
    });
    describe(`ControlValueAccessor`, () => {
        it('The interface methods are implemented', () => {
            expect(comp.writeValue).toBeDefined();
            expect(comp.registerOnChange).toBeDefined();
            expect(comp.registerOnTouched).toBeDefined();
        });
        it('registerOnChange is setting change event correctly', () => {
            const eventHandler = () => { return {}; };
            comp.registerOnChange(eventHandler);
            expect(comp.onChange).toEqual(eventHandler);
        });
        it('registerOnTouched is setting touch event correctly', () => {
            const eventHandler = () => { return {}; };
            comp.registerOnTouched(eventHandler);
            expect(comp.onTouched).toEqual(eventHandler);
        });
        it('writeValue is set correctly', () => {
            expect(comp.writeValue(null)).toBeUndefined();
        });
    });
});
