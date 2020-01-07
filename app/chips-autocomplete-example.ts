import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, HostListener} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {allItems} from './data.js';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'chips-autocomplete-example',
  templateUrl: 'chips-autocomplete-example.html',
  styleUrls: ['chips-autocomplete-example.css']
})
export class ChipsAutocompleteExample {
  @ViewChild('drgInput') drgInput: ElementRef;

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  navbar;
  iconsbar;
  bsticky;
  sticky;

  separatorKeysCodes = [ENTER, COMMA];

  drgCtrl = new FormControl();

  filteredItems: Observable<any[]>;

  selectedItems = [];

  ngOnInit() {
      // Get the navbar
      //this.navbar = document.getElementById("navbar");
      // Get the offset position of the navbar
      //this.sticky = this.navbar.offsetTop;
      
      // Get the navbar
      this.iconsbar = document.getElementById("iconsbar");
      // Get the offset position of the navbar
      this.bsticky = this.iconsbar.offsetTop;
      
  }

  constructor() {
    this.filteredItems = this.drgCtrl.valueChanges.pipe(
        startWith(''),
        map((item: string | null) => item ? this.filter(item) : allItems.slice()));
  }

  add(event: MatChipInputEvent): void {
    console.log('add');
    const input = event.input;
    const value = event.value;

    // Add our item
    if ((value || '').trim()) {
      this.selectedItems.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: any): void {
    console.log('remove');
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    // add item back to items list at the top
    allItems.unshift(item);
    this.drgInput.nativeElement.value = '';
  }

  filter(name: string) {
    return allItems.filter(item => item.toLowerCase().includes(name.toLowerCase()));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('select');
    const selectedItem = event.option.viewValue;

    // Single Selction: following code replaces the value with new selection and adds the old value(s) back to the list.
    allItems.splice(0,0,...this.selectedItems);
    this.selectedItems = [selectedItem];

    // Multiple Selection: the following code adds newly selected items to slected items list.
    //this.selectedItems.push(selectedItem);

    // remove selected item from the items list
    const selectedIndex = allItems.indexOf(selectedItem);
    allItems.splice(selectedIndex,1);

    this.drgInput.nativeElement.value = '';
    this.drgCtrl.setValue(null);
    console.log(this.selectedItems);
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    //console.log(window.pageYOffset);
    //console.log(document.body.scrollHeight);
    //console.log(document.body.offsetHeight);
    //console.log(document.documentElement.clientHeight);
    //console.log(document.documentElement.scrollHeight);
    //console.log(document.documentElement.offsetHeight);

    // if ((window.pageYOffset >= this.sticky) || window.pageYOffset != 0) {
    //   this.navbar.classList.add("sticky");
    // } else {
    //   this.navbar.classList.remove("sticky");
    // }
    var limit = document.body.scrollHeight - document.documentElement.clientHeight;
    //console.log(limit+", "+window.pageYOffset);
    if ((limit - window.pageYOffset <= 50) /* && (limit - window.pageYOffset > 5) */) {
      this.iconsbar.classList.remove("bsticky_float");
      this.iconsbar.classList.add("bsticky_footer");
    }
    //  else if (limit - window.pageYOffset <= 5) {
    //   this.iconsbar.classList.remove("bsticky_float");
    //   this.iconsbar.classList.remove("bsticky_slide");
    //   this.iconsbar.classList.add("bsticky_footer");
    // }
    else {
      this.iconsbar.classList.remove("bsticky_footer");
      this.iconsbar.classList.add("bsticky_float");
    }
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */