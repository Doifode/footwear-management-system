import { z } from "zod";

export const registerCategoryValidator = z.object({
    "categoryName": z.string(({ message: "Please enter Category Name." })).max(25).min(1, "Please enter Category Name."),
});
