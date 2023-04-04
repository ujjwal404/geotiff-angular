import { Component, OnInit } from '@angular/core';
declare var Tiff: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-image-viewer';

  ngOnInit(): void {
    this.loadimage();
  }

  loadimage() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', '../assets/images/1.tiff');
    xhr.onload = (e) => {
      const tiff = new Tiff({ buffer: xhr.response });
      const canvas = tiff.toCanvas();
      document.body.append(canvas); // beautify!
    };
    xhr.send();
  }
}
