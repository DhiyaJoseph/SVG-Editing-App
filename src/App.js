import React, { useState } from "react";
import LoginPage from "./Pages/LoginPage";

function App() {
    const [signIn, toggle] = useState(true);

    return <LoginPage signIn={signIn} toggle={toggle} />;
}

export default App;
