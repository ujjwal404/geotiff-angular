import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as GeoTIFF from 'geotiff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-image-viewer';

  // viewchild canvas element
  // @ts-ignore
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.loadimage();
  }

  async loadimage() {
    const response = await fetch('../assets/images/2.tiff');
    const buffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(buffer);

    const image = await tiff.getImage();

    const width = image.getWidth();
    const height = image.getHeight();

    const data = await image.readRasters();
    console.log(width, height);

    // Create a canvas element to render the image on
    const canvas = this.canvas.nativeElement;
    canvas.width = width;
    canvas.height = height;

    const ctx: any = canvas.getContext('2d');

    const idata = ctx.createImageData(width, height);

    // idata.data.set(data[0]);
    const dataArr: any = data[0];
    console.log(data[0]);

    for (let i = 0; i < dataArr.length; i++) {
      const val = dataArr[i];
      const scaledVal = Math.floor(val * 255);
      idata.data[i * 4] = scaledVal;
      idata.data[i * 4 + 1] = scaledVal;
      idata.data[i * 4 + 2] = scaledVal;
      idata.data[i * 4 + 3] = 255;
    }

    ctx.putImageData(idata, 0, 0);

    document.body.appendChild(canvas);
  }
}
