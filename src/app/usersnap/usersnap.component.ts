import { Component, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-usersnap',
  templateUrl: './usersnap.component.html',
  styleUrls: ['./usersnap.component.css']
})
export class UsersnapComponent {

  // Replace with the global API key from your installation page
  @Input()
  globalApiKey: string = "1324a3b2-ef42-4a15-a85e-8d024de83558";

  @ViewChild('script') script: ElementRef;
  window = null;
  constructor (@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  convertToScript() {

    this.window.onUsersnapCXLoad = function(api) {
      api.init()
      // Replace with the Project API key from your widget configuration page
      api.show("d8528e85-3a3c-4157-9abf-b081aca1ce76")
    }
    var element = this.script.nativeElement;
    var script = document.createElement("script")
    script.defer = false
    script.type = "text/javascript"

    script.src = `https://widget.usersnap.com/global/load/${this.globalApiKey}?onload=onUsersnapCXLoad`
    var parent = element.parentElement;
    parent.parentElement.replaceChild(script, parent);
  }

  ngAfterViewInit() {
    this.convertToScript();
  }
}
