import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

document.addEventListener("DOMContentLoaded", () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js", {
            scope: "/"
          })
          .then(registration => {
            console.log("Service worker registration completed");
            setInterval(() => {
              registration.update();
              console.log("Updating Service Worker ...");
            }, 60000); //manually check for updated version of sw every minute
          });
      }
    })
    .catch(err => console.error(err));
});
