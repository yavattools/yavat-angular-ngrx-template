import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/core.module';

@Component({
  selector: 'app-footer-lg',
  templateUrl: './footer-lg.component.html',
  styleUrls: ['./footer-lg.component.scss']
})
export class FooterLgComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Input() class: string = 'footer-light' // Default class 
  @Input() themeLogo: string = 'assets/logo.svg' // Default Logo
  public today: number = Date.now();
  footerImgUrl = './assets/images/stores/bf-footer.jpg';
  
   public emailForm : FormGroup = new FormGroup({
        email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    
      })


    // private subscription: Subscription;

    public dateNow = new Date();
    public dDay = new Date('Nov 26 2021 00:00:00');


  constructor() { }

  ngOnInit(): void {

  }
  

   ngOnChanges(){
        this.emailForm.controls['email'].setValue('');
      }
      subscribeForm(){
    //     let details: EmailDataItem = new EmailDataItem()
    //     details.email = this.emailForm.controls['email'].value;
    //     this.dealService.getSubscribe(details).subscribe(response => {
    //       this.toastrService.success('Subscription done.');
    //     })
    
      }
      get email() {return this.emailForm.get('email');} //getting email validation


  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
