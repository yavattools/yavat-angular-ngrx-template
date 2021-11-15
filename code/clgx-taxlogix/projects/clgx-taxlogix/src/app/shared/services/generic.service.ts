import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  BRANCH_ID,
  BRANCH_NAME,
  CLIENT_ID,
  PROCESS_ID,
  PROFILE_NAME,
  SCREEN_MAPPING,
  USER_ID,
  IMAGE_BASE_PATH,
  IMAGE_BASE_URL
} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  ClientBranch: any;
  constructor() {}

  public getUserId(): string {
    return localStorage.getItem(USER_ID) || '';
  }

  public getClientId(): string {
    return localStorage.getItem(CLIENT_ID) || '';
  }

  public getUserName(): string {
    return localStorage.getItem(PROFILE_NAME) || '';
  }

  public getBranchName() {
    return localStorage.getItem(BRANCH_NAME);
  }

  public getBranchId(): string {
    return localStorage.getItem(BRANCH_ID) || '';
  }

  public getProcessId(): string {
    return localStorage.getItem(PROCESS_ID) || '';
  }
  public getScreenMapping() {
    return JSON.parse(localStorage.getItem(SCREEN_MAPPING) || '');
  }

  public isFeatureEnabled(screenName: any) {
    const listOfScreenMaping = JSON.parse(
      localStorage.getItem(SCREEN_MAPPING) || 'false'
    );
    if (listOfScreenMaping && listOfScreenMaping.includes(screenName)) {
      return true;
    }
    return false;
  }

  public getImageUrl() {
    const imagePath = sessionStorage.getItem(IMAGE_BASE_PATH) || false;
    if (imagePath) {
      const pathArr = imagePath.split('/');
      const imgPath = pathArr
        .slice(pathArr.length - 3, pathArr.length)
        .join('/');
      return IMAGE_BASE_URL + imgPath;
    }
    return false;
  }
}
