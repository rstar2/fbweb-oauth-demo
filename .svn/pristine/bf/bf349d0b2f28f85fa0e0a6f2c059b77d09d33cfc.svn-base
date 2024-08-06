import {
  Button,
  Container,
  Card,
  CardBody,
  Heading,
  Alert,
  AlertIcon,
  Link,
  Text,
  VStack,
  Spacer,
  Divider,
} from "@chakra-ui/react";

import Logout from "@/components/Logout";
import GetAccessToken from "@/components/GetAccessToken";
import GetData from "@/components/GetData";
import SetupForm from "@/components/SetupForm";

import sessions from "@/lib/sessions";
import config from "@/lib/config";

// opt out of Next.js full route caching
export const dynamic = "force-dynamic";

// the single demo user
const uid = "user1";

export default async function Home() {
  const isLoggedIn = !!sessions.getOAuthAccessToken(uid);

  const oauthSetup = config.getOAuthSetup();

  return (
    <Container maxW="90%" marginTop="15px">
      <VStack gap="15px">
        <Heading size="lg">OAuth authorization by FbWeb</Heading>

        <Card w="full">
          <CardBody>
            <SetupForm initValue={oauthSetup} />
          </CardBody>
        </Card>

        <Divider size="lg" />

        {oauthSetup &&
          (!isLoggedIn ? (
            // not logged in, so show the Login button
            <Alert status="warning" gap="15px">
              <AlertIcon />
              <Text>
                You are not logged in FbWeb and do not have access to protected
                data
              </Text>
              <Spacer />
              <Button>
                <Link href={`/oauth/login?uid=${uid}`}>Login with FbWeb</Link>
              </Button>
            </Alert>
          ) : (
            // logged in FbWeb so allow "working" with it
            <>
              <Alert status="info" gap="15px">
                <AlertIcon />
                <Text>
                  You are logged in FbWeb and have access to protected data
                </Text>
                <Spacer />
                <GetAccessToken uid={uid} />
                <Logout uid={uid} />
              </Alert>

              <Card w="full">
                <CardBody>
                  <GetData uid={uid} />
                </CardBody>
              </Card>
            </>
          ))}
      </VStack>
    </Container>
  );
}
