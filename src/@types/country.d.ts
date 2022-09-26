interface Province {
  idProvince: string;
  name: string;
}
interface District extends Province {
  idDistrict: string;
}
interface Commune extends Omit<District, 'idProvince'> {
  idCommune: string;
}
interface DataCountry {
  province: Province[];
  district: District[];
  commune: Commune[];
}
