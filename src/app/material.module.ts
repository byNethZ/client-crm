import { NgModule } from "@angular/core";

import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    MatAutocompleteModule,
  ],
  exports: [
    MatAutocompleteModule,
  ]
})

export class MaterialModule{}
