import { z } from "zod";

export const registerBrandValidator = z.object({
    "brandName": z.string(({ message: "Please enter Brand Name." })).max(25).min(1, "Please enter Brand Name."),
});
