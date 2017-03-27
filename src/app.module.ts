import {BrowserModule} from '@angular/platform-browser'; //For bootstrapping browsermodule
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app';
import {withoutZoneAppComponent} from './app';
import {BoxComponent} from './box.component';
@NgModule({
	declarations: [
		AppComponent,
		BoxComponent,
		withoutZoneAppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	bootstrap: [AppComponent, withoutZoneAppComponent]
})
export class AppModule {
	
}