// src/components/Referral.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, logoutUser } from './api'; // Import API method
import UserInfo from './UserInfo';
import '../styles/Home.css';

const Home = (user) => {
    // console.log(user)
    const [referralData, setReferralData] = useState({ directEarnings: 0, indirectEarnings: 0 });
    const [userName, setUserName] = useState("User")
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [isDataSet, setIsDataSet] = useState(false);

    var navigate = useNavigate();

    useEffect(() => {
        if (!user || user.user == null) {
            navigate('/register');
        } else {
            const fetchReferralData = async () => {
                try {
                    const data = await getUserData(user.user);
                    setUserInfo(data);
                    setIsDataSet(true);
                    setUserName(data.user.username);
                    // setReferralData(data.earnings); // Uncomment if needed
                } catch (err) {
                    console.error('Error fetching referral data:', err);
                } finally {
                    setLoading(false);
                }
            };

            fetchReferralData();
        }
    }, [user.user, navigate]);

    const logoutOnClick = (e) => {
        logoutUser();
        navigate('/login');
    }

    return (
        <div className="referral-container">
            <button onClick={logoutOnClick}>Logout</button>
            {isDataSet && <UserInfo info={userInfo} /> }
        </div>
    );
};

export default Home;
