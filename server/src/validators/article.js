import { z } from "zod";

export const registerArticleValidator = z.object({
    "articleName": z.string(({ message: "Please enter Article Name." })).max(25).min(1, "Please enter Article Name."),
    "brandId": z.number(({ message: "Please enter Brand Name." })).max(25).min(1, "Please enter Brand Name."),
});
