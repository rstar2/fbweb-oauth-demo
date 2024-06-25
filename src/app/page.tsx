import Logout from "@/components/Logout";
import GetAccessToken from "@/components/GetAccessToken";
import GetData from "@/components/GetData";
import SetupForm from "@/components/SetupForm";

const appBaseUrlFbWeb = "/app/fbweb";

const uid = "user1";

export default function Home() {
    // todo
    const isLoggedIn = true;

    // TODO Rumen : move as actions
    const getAccessToken = () => fetch(`${appBaseUrlFbWeb}/oauth/check?uid=${uid}`);
    const logout = () => fetch(`${appBaseUrlFbWeb}/oauth/logout?uid=${uid}`);

    return (
        <div className="App">
            <h1>Demo for OAuth authorization by FbWeb</h1>

            <div className="card">
                <SetupForm/>
            </div>

            {!isLoggedIn ?

                // not logged in, so show the Login button
                <div className="card">
                    <a href={`${appBaseUrlFbWeb}/oauth/login?uid=${uid}`}>Login to FbWeb</a>
                </div> :

                // logged in FbWeb so allow "working" with it
                <>
                    <div className="card flexRow">
                        <div>You are logged in FbWeb and have access to protected data</div>
                        <Logout/>
                    </div>

                    <div className="card">
                        <GetAccessToken/>
                    </div>

                    <GetData initUrl={`${appBaseUrlFbWeb}/get_data?uid=${uid}`}/>
                </>
            }
        </div>
    );
}