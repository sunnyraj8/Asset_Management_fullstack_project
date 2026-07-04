export interface Asset {

  id: number;

  assetCode: string;

  manufacturerYear: number | null;

  brand: string | null;

  model: string | null;

  hostName: string | null;

  serialNumber: string | null;

  cpu: string | null;

  ram: string | null;

  ssd: string | null;

  operatingSystem: string | null;

  officeVersion: string | null;

  powerAdapterSerial: string | null;

  warrantyStartDate: string | null;

  warrantyEndDate: string | null;

  department: string | null;

  engineer: string | null;

  status: string;

  departmentId: number | null;

  engineerId: number | null;

}
