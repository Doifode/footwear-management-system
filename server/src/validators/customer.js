import { z } from "zod";

export const registerCustomerValidator = z.object({
    "firstName": z.string(({ message: "Please enter first Name." })).max(45).min(1, "Please enter first Name."),
    "lastName": z.string(({ message: "Please enter last Name." })).max(45).min(1, "Please enter last Name."),
    "mobileNo": z.string(({ message: "Please enter mobile no." })).max(10).min(1, "Please enter mobile no."),
});
