import { ActivationEnd, Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, merge, of } from 'rxjs';
import {
  tap,
  withLatestFrom,
  distinctUntilChanged,
  filter,
  switchMap,
  mergeMap,
  catchError
} from 'rxjs/operators';

import { selectAgencyState } from '../../core.state';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { AnimationsService } from '../../providers/animations/animations.service';
import { TitleService } from '../../providers/title/title.service';

import {
 selectActionInProgress,
 selectAgencies,
 selectAgency,
 selectAgencyStoreState,
 selectCollectionDates,
 selectEscrowNonEscrowDetails,
 selectPaymentDetails
} from './agency.selectors';
import { State } from './agency.model';
import { AgencyDataService } from './agency-data-api.service';
import * as agencyActions from './agency.actions';

export const AGENCY_KEY = 'AGENCY';

const INIT = of('clgx-init-effect-trigger');

@Injectable()
export class AgencyEffects {

  getAgencies = createEffect(() =>
      this.actions$.pipe(
        ofType(agencyActions.actionGetAllActiveAgencies),
      switchMap((action) => this.agencyDataService.getAgencies(action.request).pipe(
          mergeMap( agencyList => [
            agencyActions.actionGetAllActiveAgenciesSuccess({agencyList: agencyList}),
          ]),
          catchError(error => of(agencyActions.actionAgencyApiFailure(error)))
        ))
      )
    );

  addAgency = createEffect(()=>
  this.actions$.pipe(
    ofType(agencyActions.actionSaveAgencyDetails),
    switchMap((action)=>this.agencyDataService.addAgency(action.agency).pipe(
      mergeMap( agencyDetails=>[
        agencyActions.actionSaveAgencyDetailsSuccess({agency : agencyDetails}),
      ]),
      catchError(error => of(agencyActions.actionSaveAgencyDetailsFailure({error : error})))
    ))
  )
  );

  updateAgency = createEffect(()=>
  this.actions$.pipe(
    ofType(agencyActions.actionUpdateAgencyDetails),
    switchMap((action)=>this.agencyDataService.updateAgency(action.agency).pipe(
      mergeMap( agencyDetails=>[
        agencyActions.actionUpdateAgencyDetailsSuccess({agency : agencyDetails}),
      ]),
      catchError(error => of(agencyActions.actionUpdateAgencyDetailsFailure({error : error})))
    ))
  )
  );

  getEscrowDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionGetEscrowDetails),
    switchMap((action)=>this.agencyDataService.getEscrow(action.request).pipe(
      mergeMap( escrowDetails=>[
        agencyActions.actionGetEscrowDetailsSuccess({escrowDetails : escrowDetails}),
      ]),
      catchError(error => of(agencyActions.actionGetEscrowDetailsFailure({error : error})))
    ))
  )
  );

  getNonEscrowDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(agencyActions.actionGetNonEscrowDetails),
    switchMap((action)=>this.agencyDataService.getNonEscrow(action.request).pipe(
      mergeMap( nonEscrowDetails=>[
        agencyActions.actionGetNonEscrowDetailsSuccess({nonEscrowDetails : nonEscrowDetails}),
      ]),
      catchError(error => of(agencyActions.actionGetNonEscrowDetailsFailure({error : error})))
    ))
  )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private agencyDataService: AgencyDataService,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
    private translateService: TranslateService,
    private ngZone: NgZone
  ) {}
}

export const effects: any[] = [AgencyEffects];
