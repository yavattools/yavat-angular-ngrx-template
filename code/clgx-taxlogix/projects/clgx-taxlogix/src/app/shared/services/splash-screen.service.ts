import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {
  splashScreenEl: any;
  player: AnimationPlayer;

  constructor(
    private animationBuilder: AnimationBuilder,
    @Inject(DOCUMENT) private document: any,
    private router: Router
  ) {
    this.init();
  }

  init() {
    // Get the splash screen element
    this.splashScreenEl = this.document.body.querySelector(
      '#taxlogix-splash-screen'
    );

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        setTimeout(() => {
          // If the splash screen element exists...
          // Hide it on the first NavigationEnd event
          if (this.splashScreenEl) {
            this.hide();
          }
        });
      });
  }

  show() {
    this.player = this.animationBuilder
      .build([
        style({
          opacity: '0',
          zIndex: '99999'
        }),
        animate('400ms ease', style({ opacity: '1' }))
      ])
      .create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  hide() {
    this.player = this.animationBuilder
      .build([
        style({ opacity: '1' }),
        animate(
          '400ms ease',
          style({
            opacity: '0',
            zIndex: '-10'
          })
        )
      ])
      .create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }
}
