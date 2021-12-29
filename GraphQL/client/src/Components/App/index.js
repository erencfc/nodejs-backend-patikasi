import React from "react";
import { Route, Routes } from "react-router-dom";

import Event from "pages/Event";
import Home from "pages/Home";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/event/:id/*" element={<Event />} />
            </Routes>
        </div>
    );
}

export default App;
