interface Province {
  idProvince: string;
  name: string;
}
interface District extends Province {
  idDistrict: string;
}
interface Commune extends District {
  idCommune: string;
}
interface DataCountry {
  province: Province[];
  district: District[];
  commune: Commune[];
}
