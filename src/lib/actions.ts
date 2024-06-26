"use server";

import {redirect} from "next/navigation";

import sessions from "@/lib/sessions";
import config from "@/lib/config";
import {OAuthSetupSchema} from "@/lib/types";

export async function setup(_prevState: any, formData: FormData) {
    // validate form fields
    const validatedFields = OAuthSetupSchema.safeParse({
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
    config.setOAuthSetup(validatedFields.data);

    redirect("/");
}

export async function getData(uid: string, path: string) {
    const oauthSetup = config.getOAuthSetup();
    if (!oauthSetup)
        return new Response("No OAuth App Setup", {status: 500,});

    const accessToken = await getAccessToken(uid);
    if (!accessToken)
        throw new Error("Not authorized.");

    const data = await fetch(`${oauthSetup.fbwebUrl}${path}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    })
        .then(response => {
            if (!response.ok)
                throw new Error(response.status === 403 ? "NotAuthorized" : `FailedWithStatus_${response.status}`);
            return response;
        })
        .then(response => response.json());

    return data;
}

export async function logout(uid: string) {
    sessions.clear(uid);
    redirect("/");
}

// this endpoint is just as a test
export async function getAccessToken(uid: string) {
    return sessions.getOAuthAccessToken(uid);
}