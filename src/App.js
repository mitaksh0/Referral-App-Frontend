import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import RegisterLogin from './components/RegisterLogin';
// import Purchase from './components/Purchase';
// import Referral from './components/Referral';
import Home from './components/Home';
import './styles/App.css';


const App = () => {
    const [user, setUser] = useState(null); // Store logged-in user info

    return (
        <Router>
            <div className="App">
                <h1>Referral System</h1>
                    <Routes>
                        <Route path="/register" element={<RegisterLogin setUser={setUser} isRegister={true} />} />
                        <Route path="/login" element={<RegisterLogin setUser={setUser} isRegister={false} />} />
                        <Route path="/home" element={<Home user={user} />} />
                    </Routes>
            </div>
        </Router>
    );
};

export default App;
