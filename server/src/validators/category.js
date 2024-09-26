import { z } from "zod";

export const registerCategoryValidator = z.object({
    "categoryName": z.string(({ message: "Please enter First Name." })).max(25).min(1, "Please enter First Name."),
});
