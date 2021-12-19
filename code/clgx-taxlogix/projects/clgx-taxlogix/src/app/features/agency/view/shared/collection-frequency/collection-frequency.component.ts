import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  AgencyDefaultFrequency,
  AgencyNonFrequency,
  FrequencyType
} from '@app/core/store/agency/agency.model';

export interface Freq {
  default: string;
  non: string;
}

@Component({
  selector: 'clgx-collection-frequency',
  templateUrl: './collection-frequency.component.html',
  styleUrls: ['./collection-frequency.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionFrequencyComponent implements OnInit, OnChanges {
  @Output()
  defaultFreqSelected = new EventEmitter<string>();

  @Output()
  nonFreqSelected = new EventEmitter<string>();

  @Input()
  defFreq!: string;

  @Input()
  nonFreq!: string;

  public agDefaultFreq: AgencyDefaultFrequency;
  public agNonFreq: AgencyNonFrequency;

  constructor(public cd: ChangeDetectorRef) {
    this.agDefaultFreq = new AgencyDefaultFrequency();
    this.agNonFreq = new AgencyNonFrequency();
  }

  ngOnInit(): void {}

  ngOnChanges() {
    this.setDefaultFrequency(this.defFreq);
    this.setNonFreqency(this.nonFreq);
  }

  isAllFreqSelected() {
    let result = false;
    debugger;
    if (
      (this.agDefaultFreq.defaultAnnual ||
        this.agDefaultFreq.defaultDiscountAnnual ||
        this.agDefaultFreq.defaultQuarterly ||
        this.agDefaultFreq.defaultSemiAnnual ||
        this.agDefaultFreq.defaultTri) &&
      (this.agNonFreq.nonAnnual ||
        this.agNonFreq.nonDiscountAnnual ||
        this.agNonFreq.nonQuarterly ||
        this.agNonFreq.nonSemiAnnual ||
        this.agNonFreq.nonTri)
    ) {
      result = true;
    }

    return result;
  }

  defaultChangeHandler(default_freq: string) {
    if (
      !this.agDefaultFreq.defaultAnnual &&
      !this.agDefaultFreq.defaultDiscountAnnual &&
      !this.agDefaultFreq.defaultQuarterly &&
      !this.agDefaultFreq.defaultSemiAnnual &&
      !this.agDefaultFreq.defaultTri
    ) {
      this.defaultFreqSelected.emit('');
      return;
    }

    this.setDefaultFrequency(default_freq);

    this.cd.detectChanges();
  }

  setDefaultFrequency(freq: string) {
    switch (freq) {
      case FrequencyType.DEFAULT_ANNUAL: {
        this.agDefaultFreq.defaultAnnual = true;
        this.agDefaultFreq.defaultDiscountAnnual = false;
        this.agDefaultFreq.defaultQuarterly = false;
        this.agDefaultFreq.defaultSemiAnnual = false;
        this.agDefaultFreq.defaultTri = false;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_ANNUAL);
        break;
      }
      case FrequencyType.DEFAULT_DISCOUNT_ANNUAL: {
        this.agDefaultFreq.defaultAnnual = false;
        this.agDefaultFreq.defaultDiscountAnnual = true;
        this.agDefaultFreq.defaultQuarterly = false;
        this.agDefaultFreq.defaultSemiAnnual = false;
        this.agDefaultFreq.defaultTri = false;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_DISCOUNT_ANNUAL);

        break;
      }
      case FrequencyType.DEFAULT_QUARTELY: {
        this.agDefaultFreq.defaultAnnual = false;
        this.agDefaultFreq.defaultDiscountAnnual = false;
        this.agDefaultFreq.defaultQuarterly = true;
        this.agDefaultFreq.defaultSemiAnnual = false;
        this.agDefaultFreq.defaultTri = false;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_QUARTELY);

        break;
      }
      case FrequencyType.DEFAULT_SEMI_ANNUAL: {
        this.agDefaultFreq.defaultAnnual = false;
        this.agDefaultFreq.defaultDiscountAnnual = false;
        this.agDefaultFreq.defaultQuarterly = false;
        this.agDefaultFreq.defaultSemiAnnual = true;
        this.agDefaultFreq.defaultTri = false;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_SEMI_ANNUAL);

        break;
      }
      case FrequencyType.DEFAULT_TRI: {
        this.agDefaultFreq.defaultAnnual = false;
        this.agDefaultFreq.defaultDiscountAnnual = false;
        this.agDefaultFreq.defaultQuarterly = false;
        this.agDefaultFreq.defaultSemiAnnual = false;
        this.agDefaultFreq.defaultTri = true;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_TRI);

        break;
      }
    }
  }

  nonChangeHandler(non_freq: string) {
    debugger;
    if (
      !this.agNonFreq.nonAnnual &&
      !this.agNonFreq.nonDiscountAnnual &&
      !this.agNonFreq.nonQuarterly &&
      !this.agNonFreq.nonSemiAnnual &&
      !this.agNonFreq.nonTri
    ) {
      this.nonFreqSelected.emit('');
      return;
    }

    this.setNonFreqency(non_freq);
    this.cd.detectChanges();
  }

  setNonFreqency(freq: string) {
    switch (freq) {
      case FrequencyType.NON_ANNUAL: {
        this.agNonFreq.nonAnnual = true;
        this.agNonFreq.nonDiscountAnnual = false;
        this.agNonFreq.nonQuarterly = false;
        this.agNonFreq.nonSemiAnnual = false;
        this.agNonFreq.nonTri = false;
        this.nonFreqSelected.emit(FrequencyType.NON_ANNUAL);
        break;
      }
      case FrequencyType.NON_DISCOUNT_ANNUAL: {
        this.agNonFreq.nonAnnual = false;
        this.agNonFreq.nonDiscountAnnual = true;
        this.agNonFreq.nonQuarterly = false;
        this.agNonFreq.nonSemiAnnual = false;
        this.agNonFreq.nonTri = false;
        this.nonFreqSelected.emit(FrequencyType.NON_DISCOUNT_ANNUAL);

        break;
      }
      case FrequencyType.NON_QUARTELY: {
        this.agNonFreq.nonAnnual = false;
        this.agNonFreq.nonDiscountAnnual = false;
        this.agNonFreq.nonQuarterly = true;
        this.agNonFreq.nonSemiAnnual = false;
        this.agNonFreq.nonTri = false;
        this.nonFreqSelected.emit(FrequencyType.NON_QUARTELY);

        break;
      }
      case FrequencyType.NON_SEMI_ANNUAL: {
        this.agNonFreq.nonAnnual = false;
        this.agNonFreq.nonDiscountAnnual = false;
        this.agNonFreq.nonQuarterly = false;
        this.agNonFreq.nonSemiAnnual = true;
        this.agNonFreq.nonTri = false;
        this.nonFreqSelected.emit(FrequencyType.NON_SEMI_ANNUAL);

        break;
      }
      case FrequencyType.NON_TRI: {
        this.agNonFreq.nonAnnual = false;
        this.agNonFreq.nonDiscountAnnual = false;
        this.agNonFreq.nonQuarterly = false;
        this.agNonFreq.nonSemiAnnual = false;
        this.agNonFreq.nonTri = true;
        this.nonFreqSelected.emit(FrequencyType.NON_TRI);

        break;
      }
    }
  }
}
