import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GetParamsService {

  private _param: string | null = null;


  getParamFromUrl(param: string, activatedRoute: ActivatedRoute): string | null {
    activatedRoute.params
      .subscribe( (params) => {
        this._param = params[param];
      });

    return this._param;
  }

}
