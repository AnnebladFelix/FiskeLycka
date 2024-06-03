export interface BoatRental {
    name: string;
    phone: string;
  }
  
 export interface FishingLicenseSale {
    name: string;
    phone?: string;
    link?: string;
  }
  
 export interface DepthMap {
    info: string;
    price: string;
  }
  
 export interface FishingService {
    depthMap: DepthMap;
  }
  
 export interface OtherService {
    type: string;
    provider: string;
    phone: string;
  }
  
 export interface FishingCardInfo {
    lake: string;
    boatRental?: BoatRental;
    fishingLicenseSales: FishingLicenseSale[];
    fishingService?: FishingService;
    otherServices?: OtherService[];
  }
  