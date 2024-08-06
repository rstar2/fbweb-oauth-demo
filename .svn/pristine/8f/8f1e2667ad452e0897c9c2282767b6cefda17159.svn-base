"use client";

import { Input, Button, Stack } from "@chakra-ui/react";
import { useFormState } from "react-dom";

import { setup as setupAction } from "@/lib/actions";
import { OAuthSetup } from "@/lib/types";

export default function SetupForm({ initValue }: { initValue?: OAuthSetup }) {
  const [error, dispatch, isPending] = useFormState(setupAction, undefined);
  return (
    <>
      <form action={dispatch}>
        <Stack direction={["column", null, "row"]}>
          <Input
            placeholder="Client ID"
            name="clientId"
            defaultValue={initValue?.clientId}
          />

          <Input
            placeholder="Client Secret"
            name="clientSecret"
            defaultValue={initValue?.clientSecret}
          />

          <Input
            placeholder="FbWeb Url"
            name="fbwebUrl"
            defaultValue={initValue?.fbwebUrl}
          />

          <Button type="submit" disabled={isPending}>
            Setup
          </Button>
        </Stack>
      </form>
      {error && <p>{error.message}</p>}
    </>
  );
}
