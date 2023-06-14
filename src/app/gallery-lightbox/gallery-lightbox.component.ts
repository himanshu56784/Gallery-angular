import { animate,style,trigger,transition } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

interface Item{
  imageSrc:String;
  imageAlt:String;
}
@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss'],
  animations:[
    trigger('animation',[
      transition('void => visible' ,[
        style({transform:'scale(0.5)'}),
        animate('150ms',style({transform:'scale(1)'}))
      ]),
      transition('visible => void' ,[
        style({transform:'scale(1)'}),
        animate('150ms',style({transform:'scale(0.5)'}))
      ]),
    ]),
    trigger('animation2',[
      transition(':leave',[
        style({opacity:1}),
        animate('50ms',style({opacity:0.8}))
      ])
    ])   
  ]
})
export class GalleryLightboxComponent implements OnInit{

  @Input() galleryData:Item[] = [];
  @Input() showCount = false;


  previewImage = false;
  showMask = false;
  currentLightboxImage:Item  = this.galleryData[0];
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;


  constructor(){
    
  }

  ngOnInit(): void {
    this.totalImageCount = this.galleryData.length;
  }

  onPriviewImage( index: number) {
    this.showMask = true;
    this.previewImage = true; 
    this.currentIndex =  index;
    this.currentLightboxImage = this.galleryData[index];
  }
  onAnimationEnd(event:any){
    if(event.toState == 'void'){
    this.showMask = false;
    }
  }
  onClosePreview(){
     this.previewImage = false;
  }
  next():void {
    this.currentIndex++;
    if(this.currentIndex > this.galleryData.length - 1) {
      this.currentIndex = 0;
    } 
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }
  prev():void {
    this.currentIndex--;
    if(this.currentIndex < 0) {
      this.currentIndex = this.galleryData.length - 1;
    } 
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }
        

}
