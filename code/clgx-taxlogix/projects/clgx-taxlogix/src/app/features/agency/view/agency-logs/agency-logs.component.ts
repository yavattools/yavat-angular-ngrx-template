import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

export interface LogRecord {
  name: string;
  description: string;
  date: string;
}


const ELEMENT_DATA: LogRecord[] = [
  {
    name: 'Hydrogen',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
        date: '11/11/2021'
  },
  {
    name: 'Helium',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
        date: '11/11/2021'
  },
  {
    name: 'Lithium',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
        date: '11/11/2021'
  },
  {
    name: 'Beryllium',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
        date: '11/11/2021'

  },
  {
    name: 'Boron',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
        date: '11/11/2021'
  },
  {
    name: 'Carbon',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
        date: '11/11/2021'
  },
  {
    name: 'Nitrogen',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
        date: '11/11/2021'

  },
  {
    name: 'Oxygen',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
        date: '11/11/2021'

  },
  {
    name: 'Fluorine',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
        date: '11/11/2021'

  },
  {
    name: 'Neon',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
        date: '11/11/2021'

  },
];

@Component({
  selector: 'clgx-agency-logs',
  templateUrl: './agency-logs.component.html',
  styleUrls: ['./agency-logs.component.scss'],
})
export class AgencyLogsComponent implements OnInit, AfterViewInit {
  displayedColumns :string[]=['date', 'name', 'description'];

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  logDataSource = new MatTableDataSource<LogRecord>();
  logTablelength = 0;
  logPageSize = 0;
  logPageSizeOptions = [5, 10, 25, 100];
  @ViewChild('logPaginator', { read: MatPaginator })
  logPaginator!: MatPaginator;

  isMobile: boolean = false;
  constructor( public deviceService:DeviceDetectorService){

  }

  ngOnInit() {
    if(this.deviceService.isMobile()){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
    
    this.logDataSource.data =  ELEMENT_DATA;

    this.logDataSource.paginator = this.logPaginator;
    this.logTablelength = this.logDataSource.data.length;
    this.logPageSize = 10; 
  }


  ngAfterViewInit(): void {
    this.logDataSource.paginator = this.logPaginator;
  }
}
