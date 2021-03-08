import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IFilterService } from '../interfaces/appInterface';

@Injectable({
  providedIn: 'root'
})
export class AngularService {

  public jwtHelper: JwtHelperService

  public constructor(
    // @Inject('$document') public $document: ng.IDocumentService,
    @Inject('$filter') public $filter: IFilterService,
    // @Inject('$http') public $http: ng.IHttpService,
    // @Inject('$interval') public $interval: ng.IIntervalService,
    // @Inject('$location') public $location: ng.ILocationService,
    // @Inject('$q') public $q: ng.IQService,
    // @Inject('$rootScope') public $rootScope: ng.IRootScopeService,
    // @Inject('$timeout') public $timeout: ng.ITimeoutService,
    // @Inject('$window') public $window: ng.IWindowService,
    // @Inject('$translate') public $translate: any //ng.translate.ITranslateService,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

}
