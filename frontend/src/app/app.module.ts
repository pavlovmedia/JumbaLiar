import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from '../shared/data.service';
import {EndpointsComponent} from './endpoints/endpoints.component';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {UserComponent} from '../shared/user/user.component';
import { MediaComponent } from './media/media.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ApplicationsComponent } from './applications/applications.component';
import {CardModule} from 'primeng/card';
import {HttpClientModule} from '@angular/common/http';
import {GravatarModule} from 'ngx-gravatar';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {CreateUpdateComponent} from './endpoints/create-update/create-update.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import {ConfigurationChipComponent} from '../shared/configuration-chip/configuration-chip.component';
import {ConditionalComponent} from '../shared/conditional/conditional.component';
import {ConditionalService} from '../shared/conditional.service';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {MultiSelectModule} from 'primeng/multiselect';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    EndpointsComponent,
    UserComponent,
    MediaComponent,
    AccountsComponent,
    ApplicationsComponent,
    CreateUpdateComponent,
    ConfigurationChipComponent,
    ConditionalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    MenubarModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    PanelModule,
    TableModule,
    CardModule,
    HttpClientModule,
    GravatarModule,
    DialogModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ToggleButtonModule,
    AutoCompleteModule,
    DropdownModule,
    MonacoEditorModule.forRoot(),
    MultiSelectModule,
    TooltipModule
  ],
  providers: [MessageService, DataService, ConfirmationService, ConditionalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
