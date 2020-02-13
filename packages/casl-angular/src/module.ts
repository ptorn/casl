import { NgModule, ModuleWithProviders } from '@angular/core';
import { Ability, Subject } from '@casl/ability';
import { __decorate as d, __metadata as m } from 'tslib/tslib.es6'; // eslint-disable-line
import { CanPipe } from './can';

const __decorate = d; // eslint-disable-line
const __metadata = m; // eslint-disable-line

@NgModule({
  declarations: [
    CanPipe
  ],
  exports: [
    CanPipe
  ],
})
export class AbilityModule {
  static forRoot<
    Actions extends string = string,
    Subjects extends Subject = Subject,
    Conditions = object
  >(): ModuleWithProviders {
    return {
      ngModule: AbilityModule,
      providers: [
        {
          provide: Ability,
          useFactory: () => new Ability<Actions, Subjects, Conditions>([])
        },
      ]
    };
  }
}
