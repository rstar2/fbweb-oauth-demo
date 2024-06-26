import z from "zod";

export const OAuthSetupSchema = z.object({
    clientId: z.string({
        invalid_type_error: "Please set a valid OAuth Client ID.",
    }),

    clientSecret: z.string({
        invalid_type_error: "Please set a valid OAuth Client Secret.",
    }),

    fbwebUrl: z.string({
        invalid_type_error: "Please set a valid FbWeb server URL.",
    }).url({
        message: "Please set a valid FbWeb server URL.",
    }),
});

export type OAuthSetup = z.infer<typeof OAuthSetupSchema>;