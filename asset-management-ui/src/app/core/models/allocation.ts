export interface Allocation {

  id: number;

  assetId: number;
  assetCode: string;

  employeeCode: string;

  employeeName: string;

  allocatedDate: string;

  expectedReturnDate: string;

  returnedDate: string | null;

  status: string;

}
