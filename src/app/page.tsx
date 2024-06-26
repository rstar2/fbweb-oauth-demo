import Logout from "@/components/Logout";
import GetAccessToken from "@/components/GetAccessToken";
import GetData from "@/components/GetData";
import SetupForm from "@/components/SetupForm";

import sessions from "@/lib/sessions";
import config from "@/lib/config";

// opt out of Next.js full route caching
export const dynamic = "force-dynamic";

// single demo user
const uid = "user1";

export default function Home() {
    const isLoggedIn = !!sessions.getOAuthAccessToken(uid);

    const oauthSetup = config.getOAuthSetup();

    return (
        <div className="App">
            <h3>OAuth authorization by FbWeb - {new Date().toLocaleString()} - {config.getDate()}</h3>

            <div className="card">
                <SetupForm initValue={oauthSetup}/>
            </div>

            {oauthSetup &&

                (!isLoggedIn ?

                    // not logged in, so show the Login button
                    <div className="card">
                        <a href={`/oauth/login?uid=${uid}`}>Login to FbWeb</a>
                    </div> :

                    // logged in FbWeb so allow "working" with it
                    <>
                        <div className="card flexRow">
                            <div>You are logged in FbWeb and have access to protected data</div>
                            <Logout uid={uid}/>
                        </div>

                        <div className="card">
                            <GetAccessToken uid={uid}/>
                        </div>

                        <GetData uid={uid}/>
                    </>)
            }
        </div>
    );
}