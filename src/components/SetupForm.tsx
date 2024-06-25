"use client";

import {useFormState} from "react-dom";

import {setup as setupAction} from "@/lib/actions";

export default function SetupForm() {
    const [error, dispatch, isPending] = useFormState(setupAction, undefined);
    return (
        <>
            <form className="flexRow" action={dispatch}>
                <input name="clientId"/>
                <input name="clientSecret"/>
                <input name="fbwebUrl"/>
                <button type="submit" disabled={isPending}>Setup</button>
            </form>
            {error && <p>{error.message}</p>}
        </>
    );
}