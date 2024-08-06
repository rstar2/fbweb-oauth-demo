"use client";

import { useState } from "react";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import { getData as getDataAction } from "@/lib/actions";
import {
  Button,
  Stack,
  Input,
  Divider,
  VStack,
  Box,
  useToast,
} from "@chakra-ui/react";

const demoPath =
  '/fbweb/app/protected/ajax/list_activity?data=%7B"p"%3A"%7B%5C"isNewer%5C"%3Afalse%2C%5C"readState%5C"%3A%5C"unread%5C"%2C%5C"coid%5C"%3A%5C"_default%5C"%7D"%7D&rid=3';

export default function GetData({ uid }: { uid: string }) {
  const toast = useToast();

  const [requestPath, setRequestPath] = useState<string>(demoPath);
  const [requestQuery, setRequestQuery] = useState<string>("{}");
  const [data, setData] = useState<any>({});

  return (
    <VStack gap="15px" justifyContent="flex-start">
      <Stack direction={["column", null, "row"]} gap="15px" w="full">
        <Input
          placeholder="Action path"
          value={requestPath}
          onChange={(e) => setRequestPath(e.target.value)}
        />
        <Button
          onClick={async () => {
            try {
              const data = await getDataAction(uid, requestPath);
              setData(data);
            } catch (e) {
              // show validation error
              toast({
                title: "Error",
                description: "Failed to get data from FbWeb",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              setData({});
            }
          }}
        >
          Get Data
        </Button>
      </Stack>

      <Divider />

      {data && (
        <Box w="full">
          <JsonView
            data={data}
            shouldExpandNode={allExpanded}
            style={defaultStyles}
          />
        </Box>
      )}
    </VStack>
  );
}
