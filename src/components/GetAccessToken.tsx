"use client";

import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

import { getAccessToken as getAccessTokenAction } from "@/lib/actions";

const NO_TOKEN = "--- NO TOKEN ---";

export default function Logout({ uid }: { uid: string }) {
  const [accessToken, setAccessToken] = useState("");
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={async () => {
          if (!accessToken)
            setAccessToken((await getAccessTokenAction(uid)) || NO_TOKEN);
          onOpen();
        }}
      >
        Access Token
      </Button>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              OAuth Access Token
            </AlertDialogHeader>

            <AlertDialogBody>
              {accessToken}

              {/* Allow to copy it */}
              {accessToken && accessToken !== NO_TOKEN && (
                <IconButton
                  marginLeft="15px"
                  aria-label="Copy"
                  icon={<CopyIcon />}
                  onClick={() => navigator.clipboard.writeText(accessToken)}
                />
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
