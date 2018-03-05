import {Injectable} from "@angular/core";
/**
 * Created by lee on 17-1-13.
 */
@Injectable()
export class  AppConfig {
  getServiceURI= ()=> {
    let serviceUri = JSON.parse((<any>window).localStorage.getItem('ServiceURI'));
    if (!serviceUri) {
      // serviceUri = 'http://192.168.31.171:3390/api/v1/';
      // serviceUri = 'http://192.168.31.239:3390/api/v1/';
      serviceUri = 'http://106.15.229.226:3390/api/v1/';
    }
    return serviceUri;
  }

  setServiceURI =  (value)=> {
    (<any>window).localStorage.setItem('ServiceURI', JSON.stringify(value));
  }

  public ServiceURI = this.getServiceURI()
  public fileHost = this.getServiceURI() + 'attachments/download/'
  
  public commons = {
    SPLIT: '_',
  }

}
