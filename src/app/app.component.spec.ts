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
import { AppComponent } from './app.component';
import { AppState } from './app.service';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AppState]
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
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should be demo`, () => {
    expect(comp.name).toEqual('Demo');
  });

  it('should log ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.dropdownModel).toBeDefined();
  });

  it('should set selected games on selection change', () => {
    comp.dropdownModel[0].selected = true;
    comp.onChange(new Event('test'));
    expect(comp.selectedGames).toBeDefined();
    expect(comp.selectedGames).toEqual([comp.dropdownModel[0]]);
  });

});
