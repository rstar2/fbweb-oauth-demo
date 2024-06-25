"use server";

import {redirect} from "next/navigation";
import z from "zod";

const SetupFormSchema = z.object({
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

export async function setup(_prevState: any, formData: FormData) {
    // validate form fields
    const validatedFields = SetupFormSchema.safeParse({
        clientId: formData.get("clientId"),
        clientSecret: formData.get("clientSecret"),
        fbwebUrl: formData.get("fbwebUrl"),
    });

    // if form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Failed to setup the OAuth client.",
        };
    }

    redirect("/");
}

export async function getData(url: string) {
    // TODO Rumen :
    // validate - this url must in the same fbwebUrl previously setup
    return {
        url,
        asd: 1,
    };
}

export async function logout() {
    // TODO Rumen :

    redirect("/");
}

// this endpoint is just as a test
export async function getAccessToken() {
    // TODO Rumen :
    return "accessToken";
}