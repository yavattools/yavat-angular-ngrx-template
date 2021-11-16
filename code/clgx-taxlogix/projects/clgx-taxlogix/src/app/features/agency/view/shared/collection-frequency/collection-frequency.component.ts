import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'clgx-collection-frequency',
  templateUrl: './collection-frequency.component.html',
  styleUrls: ['./collection-frequency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionFrequencyComponent implements OnInit {
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
  constructor() {}

  ngOnInit(): void {}
}
