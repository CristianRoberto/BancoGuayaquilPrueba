import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrarproductoComponent } from './registrarproducto/registrarproducto.component';


@NgModule({
  declarations: [
    RegistrarproductoComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    RegistrarproductoComponent
  ],
})
export class ComponentsModule { }
