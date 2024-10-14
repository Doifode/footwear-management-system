import { z } from "zod";

export const registerMainBillValidator = z.object({
    "itemQuantity": z.number(({ message: "Please enter quantity." })).min(1, "Please enter First Name."),
    "totalAmount": z.number(({ message: "Please enter total amount." })).min(1, "Please enter total amount."),
    "paidAmount": z.number(({ message: "Please enter paid amount." })).min(1, "Please enter paid amount."),
    "grandTotal": z.number(({ message: "Please enter grand total." })).min(1, "Please enter grand total."),
    "customerId": z.number(({ message: "Please enter customer id." })).min(1, "Please enter customer id."),

});

