import { z } from "zod";

export const registerUserValidator = z.object({
    "firstName": z.string(({ message: "Please enter First Name." })).max(25).min(1, "Please enter First Name."),
    "lastName": z.string(({ message: "Please enter Last Name." })).max(25).min(1, "Please enter Last Name."),
    "userName": z.string(({ message: "Please enter Username." })).max(100).min(1, "Please enter Username."),
    "shopId": z.number(({ message: "Please enter Shopid." })).min(1, "Please enter ShopId."),
    "mobileNo": z.string(({ message: "Please enter mobile no." })).max(25).min(1, "Please enter mobile no."),
    createdBy: z.number(({ message: "Please provide created by id." }))
});

export const resetPasswordValidator = z.object({
    "token": z.string(({ message: "Invalid link." })).max(36).min(1, "Invalid link."),
    "password": z.string(({ message: "Please enter Password." })).max(25).min(1, "Please enter Password."),
});