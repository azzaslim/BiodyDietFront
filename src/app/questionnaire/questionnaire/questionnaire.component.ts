import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  isShown: boolean = false ; // hidden by default
  isShown1: boolean = false ;
  isShown2: boolean = false ;
  isShown3: boolean = false ;
  isShown4: boolean = false ;

toggleShow() {
  

  if(this.isShown1==true){
    this.toggleShow1();
    }
    if(this.isShown2==true){
      this.toggleShow2();
    }
    if(this.isShown3==true)
    {
    this.toggleShow3();
    }
    if(this.isShown4==true)
    {
    this.toggleShow4();
    }

this.isShown = ! this.isShown;
}

toggleShow1() {
  if(this.isShown==true){
    this.toggleShow();
    }
    if(this.isShown2==true){
      this.toggleShow2();
    }
    if(this.isShown3==true){
    this.toggleShow3();
  }
  if(this.isShown4==true)
  {
  this.toggleShow4();
  }

  this.isShown1 = ! this.isShown1;
  
  
  }
  toggleShow2() {
    if(this.isShown1==true){
      this.toggleShow1();
      }
      if(this.isShown==true){
        this.toggleShow();
      }
      if(this.isShown3==true)
      {
      this.toggleShow3();
      }
      if(this.isShown4==true)
      {
      this.toggleShow4();
      }

    this.isShown2 = ! this.isShown2;
    
    
    }
    toggleShow3() {
      if(this.isShown1==true){
        this.toggleShow1();
        }
        if(this.isShown2==true){
          this.toggleShow2();
        }
        if(this.isShown==true)
        {
        this.toggleShow();
        }
        if(this.isShown4==true)
        {
        this.toggleShow4();
        }


      this.isShown3 = ! this.isShown3;
      
      
      }

      toggleShow4() {
        if(this.isShown1==true){
          this.toggleShow1();
          }
          if(this.isShown2==true){
            this.toggleShow2();
          }
          if(this.isShown==true)
          {
          this.toggleShow();
          }
  
          if(this.isShown3==true)
          {
          this.toggleShow3();
          }
  
        this.isShown4 = ! this.isShown4;
        
        
        }
  


  constructor() { }

  ngOnInit(): void {
    
  }
  

}