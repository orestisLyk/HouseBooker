import z from "zod";

export const imageSchema = z.object({
    image: z.instanceof(FileList)
        .refine(files => files.length > 0, "File is required")
        .transform(files => files[0])
})