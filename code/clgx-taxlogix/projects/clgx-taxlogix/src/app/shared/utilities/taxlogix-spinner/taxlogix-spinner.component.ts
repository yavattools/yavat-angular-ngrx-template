import {
  Component,
  Input,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  DoCheck
} from '@angular/core';
// import { ProgressSpinnerMode, ThemePalette } from '@angular/material';
import { OverlayRef } from '@angular/cdk/overlay';

import {
  OverlayService,
  AppOverlayConfig
} from '../../services/overlay.service';
@Component({
  selector: 'app-taxlogix-spinner',
  templateUrl: './taxlogix-spinner.component.html',
  styleUrls: ['./taxlogix-spinner.component.scss']
})
export class TaxlogixSpinnerComponent implements OnInit, DoCheck {
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressSpinner: boolean | undefined;
  @ViewChild('progressSpinnerRef', { read: TemplateRef, static: true })
  progressSpinnerRef!: TemplateRef<any>;
  private progressSpinnerOverlayConfig: AppOverlayConfig | undefined;
  private overlayRef: OverlayRef | undefined;

  constructor(
    private vcRef: ViewContainerRef,
    private overlayService: OverlayService
  ) {
    // this.progressSpinnerOverlayConfig =  {
    //   hasBackdrop: this.backdropEnabled,
    //   backdropClass: 'backdrop-progress'
    // };
    // this.overlayRef = this.overlayService.createOverlay(this.progressSpinnerOverlayConfig);
  }
  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled,
      backdropClass: 'backdrop-progress'
    };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig.positionStrategy =
        this.overlayService.positionGloballyCenter();
    }
    // Create Overlay for progress spinner
    this.overlayRef = this.overlayService.createOverlay(
      this.progressSpinnerOverlayConfig
    );
  }
  ngDoCheck() {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (
      this.displayProgressSpinner &&
      this.overlayRef &&
      !this.overlayRef.hasAttached()
    ) {
      this.overlayService.attachTemplatePortal(
        this.overlayRef,
        this.progressSpinnerRef,
        this.vcRef
      );
    } else if (
      !this.displayProgressSpinner &&
      this.overlayRef &&
      this.overlayRef.hasAttached()
    ) {
      this.overlayRef.detach();
    }
  }
}
