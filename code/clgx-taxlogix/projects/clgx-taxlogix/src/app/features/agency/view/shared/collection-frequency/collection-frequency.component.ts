import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AgencyDefaultFrequency, AgencyNonFrequency, FrequencyType } from '@app/core/store/agency/agency.model';

export interface Freq {
  default: string;
  non: string;
}

@Component({
  selector: 'clgx-collection-frequency',
  templateUrl: './collection-frequency.component.html',
  styleUrls: ['./collection-frequency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  annual_default_checked: Boolean = false;
  annual_non_checked: Boolean = false;
  discount_annual_default_checked: Boolean = false;
  discount_annual_non_checked: Boolean = false;
  semi_annual_default_checked: Boolean = false;
  semi_annual_non_checked: Boolean = false;
  tri_default_checked: Boolean = false;
  tri_non_checked: Boolean = false;
  quarterly_default_checked: Boolean = false;
  quarterly_non_checked: Boolean = false;
  constructor() {
    this.agDefaultFreq = Object.create({});
    this.agNonFreq = new AgencyNonFrequency();
  }

  ngOnInit(): void {}

  ngOnChanges(){

  }

  defaultChangeHandler(default_freq: string){
    switch(default_freq){
      case FrequencyType.DEFAULT_ANNUAL:{
        this.agDefaultFreq.default_annual = true;
        this.agDefaultFreq.default_discount_annual = false;
        this.agDefaultFreq.default_quarterly = false;
        this.agDefaultFreq.default_semi_annual = false;
        this.agDefaultFreq.default_tri = false;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_ANNUAL);
        break;
      }
      case FrequencyType.DEFAULT_DISCOUNT_ANNUAL:{
        this.agDefaultFreq.default_annual = false;
        this.agDefaultFreq.default_discount_annual = true;
        this.agDefaultFreq.default_quarterly = false;
        this.agDefaultFreq.default_semi_annual = false;
        this.agDefaultFreq.default_tri = false;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_DISCOUNT_ANNUAL);

        break;
      }
      case FrequencyType.DEFAULT_QUARTELY:{
        this.agDefaultFreq.default_annual = false;
        this.agDefaultFreq.default_discount_annual = false;
        this.agDefaultFreq.default_quarterly = true;
        this.agDefaultFreq.default_semi_annual = false;
        this.agDefaultFreq.default_tri = false;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_QUARTELY);

        break;
      }
      case FrequencyType.DEFAULT_SEMI_ANNUAL:{
        this.agDefaultFreq.default_annual = false;
        this.agDefaultFreq.default_discount_annual = false;
        this.agDefaultFreq.default_quarterly = false;
        this.agDefaultFreq.default_semi_annual = true;
        this.agDefaultFreq.default_tri = false;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_SEMI_ANNUAL);

        break;
      }
      case FrequencyType.DEFAULT_TRI:{
        this.agDefaultFreq.default_annual = false;
        this.agDefaultFreq.default_discount_annual = false;
        this.agDefaultFreq.default_quarterly = false;
        this.agDefaultFreq.default_semi_annual = false;
        this.agDefaultFreq.default_tri = true;
        this.defaultFreqSelected.emit(FrequencyType.DEFAULT_TRI);

        break;
      }
    }
  }

  nonChangeHandler(non_freq: string){
    switch(non_freq){
      case FrequencyType.NON_ANNUAL:{
        this.agNonFreq.non_annual = true;
        this.agNonFreq.non_discount_annual = false;
        this.agNonFreq.non_quarterly = false;
        this.agNonFreq.non_semi_annual = false;
        this.agNonFreq.non_tri = false;
        this.nonFreqSelected.emit(FrequencyType.NON_ANNUAL);
        break;
      }
      case FrequencyType.NON_DISCOUNT_ANNUAL:{
        this.agNonFreq.non_annual = false;
        this.agNonFreq.non_discount_annual = true;
        this.agNonFreq.non_quarterly = false;
        this.agNonFreq.non_semi_annual = false;
        this.agNonFreq.non_tri = false;
        this.nonFreqSelected.emit(FrequencyType.NON_DISCOUNT_ANNUAL);

        break;
      }
      case FrequencyType.NON_QUARTELY:{
        this.agNonFreq.non_annual = false;
        this.agNonFreq.non_discount_annual = false;
        this.agNonFreq.non_quarterly = true;
        this.agNonFreq.non_semi_annual = false;
        this.agNonFreq.non_tri = false;
        this.nonFreqSelected.emit(FrequencyType.NON_QUARTELY);

        break;
      }
      case FrequencyType.NON_SEMI_ANNUAL:{
        this.agNonFreq.non_annual = false;
        this.agNonFreq.non_discount_annual = false;
        this.agNonFreq.non_quarterly = false;
        this.agNonFreq.non_semi_annual = true;
        this.agNonFreq.non_tri = false;
        this.nonFreqSelected.emit(FrequencyType.NON_SEMI_ANNUAL);

        break;
      }
      case FrequencyType.NON_TRI:{
        this.agNonFreq.non_annual = false;
        this.agNonFreq.non_discount_annual = false;
        this.agNonFreq.non_quarterly = false;
        this.agNonFreq.non_semi_annual = false;
        this.agNonFreq.non_tri = true;
        this.nonFreqSelected.emit(FrequencyType.NON_TRI);

        break;
      }
    }
  }
}
