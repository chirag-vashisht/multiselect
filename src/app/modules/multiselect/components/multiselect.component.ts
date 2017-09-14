import {
  Component, Input, Output, OnInit,
  OnChanges, EventEmitter, SimpleChange, Self
} from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms';

import { IDropdownItem, IMultiselectConfig } from '../interfaces';
import { MultiselectConfig } from '../models';

/**
 * Multiselect component to be used by components.
 *
 * Input: config - configuration.
 * Input: model - dropdown options model.
 *
 * @export
 * @class MultiselectComponent
 * @implements {ControlValueAccessor, OnInit}
 */
@Component({
  selector: 'multiselect[ngModel]',
  templateUrl: './multiselect.component.html',
  styles: [`.multiselect-container {
                display: inline-block;
                position: relative; }`,

    `.top-section.with-border {
                border-bottom: 1px solid #ccc; }`,

    `.with-border > .dropdown-item {
                margin-bottom: 4px; }`,

    `.with-border {
               margin-bottom: 4px; }`,

    `.row-color {
                width: 15px;
                height: 15px;
                display: inline-block;
                position: relative;
                top: 3px;
                margin-right: 5px;
                border-radius: 3px; }`,

    `.scrollable-menu {
                height: auto;
                overflow-x: hidden; }`,

    `.check-area {
                width: 18px;
                display: inline-block; }`,

    `.dropdown-multiselect-clickable {
               cursor: pointer; }`],
  providers: [NgModel]
})
export class MultiselectComponent implements ControlValueAccessor, OnInit {

  /**
   * Configuration object to show bespoke version of component.
   *
   * @type {IMultiselectConfig}
   */
  @Input() public dropdownConfig: IMultiselectConfig;

  @Input() public autoClose: boolean;

  public cd: NgModel;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  /**
   * Configuration object used by the template.
   *
   * @type {MultiselectConfig}
   */
  public config: MultiselectConfig;

  private dropdownItems: IDropdownItem[];
  private filter: string;

  /** Creates an instance of DropdownMultiselectComponent. */
  constructor( @Self() cd: NgModel) {
    this.cd = cd;
    cd.valueAccessor = this;
    this.cd.viewModel = [];
    this.config = new MultiselectConfig();
    this.filter = null;
    this.autoClose = false;
  }

  /** OnInit implementation */
  public ngOnInit() {
    this.setUndefinedSelectedToFalse();
    this.processOptions(this.dropdownConfig);
  }

  /** ControlValueAccessor implementation */
  public writeValue(value: any) { return; }

  /** ControlValueAccessor implementation */
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  /** ControlValueAccessor implementation */
  public registerOnTouched(fn: (_: any) => {}): void {
    this.onTouched = fn;
  }

  /**
   * Returns the count of selected dropdown items.
   *
   * @readonly
   * @type {number}
   * @memberOf DropdownMultiselectComponent
   */
  get selectedLength(): number {
    return this.cd.viewModel.filter(({ selected }) => selected).length;
  }

  /**
   * Returns the appropriate string to display on the dropdown button.
   *
   * @readonly
   * @type {string}
   * @memberOf DropdownMultiselectComponent
   */
  get buttonLabel(): string {
    const count = this.selectedLength;
    const model = this.cd.viewModel;
    const { maxInline, buttonLabel } = this.config;

    if (count > maxInline || count === 0) { return buttonLabel; }

    const labeled = model.reduce((prev, { selected, label }) => {
      if (!selected) { return prev; };
      return `${prev}${label}, `;
    }, '');

    return labeled.slice(0, labeled.length - 2); // Remove trailing ', '
  }

  /**
   * Select / deselect dropdown option.
   */
  public toggleRow(item: IDropdownItem) {
    item.selected = !item.selected;
    this.onChange(this.cd.viewModel);
  }

  /**
   * Deselect all dropdown options.
   */
  public uncheckAll() {
    this.setSelectedTo(false);
    this.onChange(this.cd.viewModel);
  }

  /**
   * Select all dropdown options.
   */
  public checkAll() {
    this.setSelectedTo(true);
    this.onChange(this.cd.viewModel);
  }

  /**
   * Determine how the dropdown should be configured.
   *
   * @private
   */
  private processOptions(opts: IMultiselectConfig) {

    if (opts == null) {
      return;
    }

    const IsBoolean = (val: any) => typeof (val) === 'boolean';
    const IsString = (val: any) => typeof (val) === 'string';
    const IsNumber = (val: any) => typeof (val) === 'number';

    // defaultButtonText
    if (IsString(opts.defaultButtonText)) {
      this.config.buttonLabel = opts.defaultButtonText;
    }

    // allSelected
    if (IsBoolean(opts.allSelected)) {
      this.config.allSelected = opts.allSelected;

      if (this.config.allSelected) {
        this.checkAll();
      }
    }

    // showCheckAll
    if (IsBoolean(opts.showCheckAll)) {
      this.config.showCheckAll = opts.showCheckAll;
    }

    // showUncheckAll
    if (IsBoolean(opts.showUncheckAll)) {
      this.config.showUncheckAll = opts.showUncheckAll;
    }

    // maxInline
    if (IsNumber(opts.maxInline)) {
      this.config.maxInline = opts.maxInline;
    }

    // buttonClasses
    if (Array.isArray(opts.buttonClasses)) {
      this.config.buttonClasses = opts.buttonClasses;
    }

    // checkClasses
    if (Array.isArray(opts.checkClasses)) {
      this.config.checkClasses = opts.checkClasses;
    }

    // uncheckClasses
    if (Array.isArray(opts.uncheckClasses)) {
      this.config.uncheckClasses = opts.uncheckClasses;
    }

    // scrollingHeight
    if (IsNumber(opts.scrollingHeight)) {
      this.config.scrollingHeight = opts.scrollingHeight;
    }

    if (IsString(opts.searchBoxPlaceHolder)) {
      this.config.searchBoxPlaceHolder = opts.searchBoxPlaceHolder;
    }
  }

  /**
   * Update all options in the model to either:
   * - selected `val = true`
   * - deselected `val = false`
   *
   * @private
   */
  private setSelectedTo(val: boolean) {
    const newModel = this.cd.viewModel.map((item) => {
      return Object.assign({}, item, { selected: val });
    });

    this.cd.viewToModelUpdate(newModel);
  }

  /**
   * Updates undefined selected props to false (fills in selected where not provided)
   * @private
   */
  private setUndefinedSelectedToFalse() {
    const newModel = this.cd.viewModel.map((item: IDropdownItem) => {
      return typeof (item.selected) === 'undefined' ?
        Object.assign({}, item, { selected: false }) : item;
    });
    this.cd.viewToModelUpdate(newModel);
  }

}
