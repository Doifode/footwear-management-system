import { IMainBill } from "./PaymentTypes";


export interface IMainBillList extends IMainBill {
    firstName: string,
    lastName: string,
    mobileNo: number
}