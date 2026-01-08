import { NgModule, ApplicationRef } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [provideServerRouting(serverRoutes)],
})
export class AppServerModule {
  constructor(private appRef: ApplicationRef) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    // Manually bootstrap the standalone AppComponent
    appRef.bootstrap(AppComponent);
  }
}
