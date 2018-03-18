import {Injectable} from "@angular/core";
/**
 * Created by lee on 17-1-13.
 */
@Injectable()
export class  AppConfig {
  getServiceURI= ()=> {
    let serviceUri = JSON.parse((<any>window).localStorage.getItem('ServiceURI'));
    if (!serviceUri) {
      serviceUri = 'http://localhost:3390/api/v1/';
      // serviceUri = 'http://192.168.31.171:3390/api/v1/';
    }
    return serviceUri;
  }

  setServiceURI =  (value)=> {
    (<any>window).localStorage.setItem('ServiceURI', JSON.stringify(value));
  }

  public ServiceURI = this.getServiceURI();
  public fileHost = this.getServiceURI() + 'file/';
  
  public commons = {
    SPLIT: '_',
  }

}
