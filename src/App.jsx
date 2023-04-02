import * as React from "react";

import Greeting from "./Greeting";

const MFE = React.lazy(() => import('mfe/MFE'));

const App = () => (
    <div>
        <Greeting />
        <React.Suspense fallback="Loading...">
            <MFE />
        </React.Suspense>
    </div>
);

export default App;