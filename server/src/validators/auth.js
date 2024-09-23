import { z } from "zod";

export const verifyUserValidator = z.object({
    "identifier": z.string(({ message: "Please enter username / email." })).max(36).min(1, "Please enter username / email."),
    "password": z.string(({ message: "Please enter Password." })).max(25).min(1, "Please enter Password."),
 });