import { z } from "zod";

export const registerColorValidator = z.object({
    "colorName": z.string(({ message: "Please enter Color Name." })).max(25).min(1, "Please enter Color Name."),
    "colorCode": z.string(({ message: "Please enter Color Code." })).max(25).min(1, "Please enter Color Code."),
});
