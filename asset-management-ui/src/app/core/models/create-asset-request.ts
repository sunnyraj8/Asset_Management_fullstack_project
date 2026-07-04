export interface CreateAssetRequest {

  manufacturerYear: number | null;

  brand: string;

  model: string;

  hostName: string;

  serialNumber: string;

  cpu: string | null;

  ram: string | null;

  ssd: string | null;

  operatingSystem: string | null;

  officeVersion: string | null;

  powerAdapterSerial: string | null;

  warrantyStartDate: string | null;

  warrantyEndDate: string | null;

  departmentId: number;

  engineerId: number;

}
