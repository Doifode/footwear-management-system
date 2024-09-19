import { z } from "zod";

export const registerShopValidator = z.object({
    "shopName": z.string(({ message: "Please enter Shop Name." })).max(25).min(1, "Please enter Shop Name."),
    "userName": z.string(({ message: "Please enter Shop User Name." })).max(25).min(1, "Please enter Shop User Name."),
    "state": z.string(({ message: "Please enter State." })).max(100).min(1, "Please enter State."),
    "district": z.string(({ message: "Please enter District." })).max(100).min(1, "Please enter District."),
    "tahsil": z.string(({ message: "Please enter Tahsil." })).max(25).min(1, "Please enter Tahsil."),
    "city": z.string(({ message: "Please enter City." })).max(25).min(1, "Please enter City."),
    "landMark": z.string(({ message: "Please enter Landmark." })).max(500).min(1, "Please enter Landmark."),
    createdBy: z.number(({ message: "Please provide created by id." }))
});