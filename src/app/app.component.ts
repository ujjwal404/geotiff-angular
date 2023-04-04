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
    // Load the GeoTIFF file from the assets folder
    const response = await fetch('../assets/images/5.tiff');
    const buffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(buffer);
    // Get the first image from the TIFF file
    const image = await tiff.getImage();

    const width = image.getWidth();
    const height = image.getHeight();

    const data = await image.readRasters();
    console.log(width, height);

    // Create a canvas element to render the image on
    const canvas = this.canvas.nativeElement;
    canvas.width = width;
    canvas.height = height;

    // Get the 2D rendering context from the canvas
    const ctx: any = canvas.getContext('2d');

    // Create an ImageData object
    const idata = ctx.createImageData(width, height);

    // Set the imagedata from the tiff
    idata.data.set(data[0]);

    // Draw the imagedata on the canvas
    ctx.putImageData(idata, 0, 0);

    // Draw the canvas on the page
    document.body.appendChild(canvas);
  }
}
