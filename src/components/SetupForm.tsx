"use client";

import {useFormState} from "react-dom";

import {setup as setupAction} from "@/lib/actions";
import {OAuthSetup} from "@/lib/types";

export default function SetupForm({initValue}: { initValue?: OAuthSetup }) {
    const [error, dispatch, isPending] = useFormState(setupAction, undefined);
    return (
        <>
            <form className="flexRow" action={dispatch}>
                <label htmlFor="clientId">Client ID</label>
                <input name="clientId" defaultValue={initValue?.clientId}/>

                <label htmlFor="clientSecret">Client Secret</label>
                <input name="clientSecret" defaultValue={initValue?.clientSecret}/>

                <label htmlFor="fbwebUrl">FbWeb Url</label>
                <input name="fbwebUrl" defaultValue={initValue?.fbwebUrl}/>

                <button type="submit" disabled={isPending}>Setup</button>
            </form>
            {error && <p>{error.message}</p>}
        </>
    );
}