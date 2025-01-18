import '../styles/UserInfo.css';
import { makePurchase } from './api';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const UserInfo = ({info}) => {

    const [referralData, setReferralData] = useState({
        directEarnings: info.user.direct_referral,
        indirectEarnings: info.user.indirect_referral
    })

    const purchaseSubmit = (e) => {
        e.preventDefault();
        let p = e.target[0].value;
        // make api call to purchase
        let data = makePurchase(info.user._id, p);
        e.target[0].value = '';
    }
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create socket connection
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        // Listen for 'referralUpdate' event
        newSocket.on('referralUpdate', (data) => {
            console.log("Referral update received:", data);
            // Check if the update is for the active user
            if (data.userId === info.user._id) {
                setReferralData(data.earnings);
            }
        });

        // Cleanup on component unmount
        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);


    return (
        <div className="user-info">
            <h2>Welcome, {info.user.username}</h2>
            <div>
                <div className="info">
                    <h3>User Info</h3>
                    <table>
                       <tbody>
                        <tr>
                                <td>Referral ID</td>
                                <td>{info.user._id}</td>
                            </tr>
                            <tr>
                                <td>Level</td>
                                <td>{info.user.level}</td>
                            </tr>
                            <tr>
                                <td>Refer Count</td>
                                <td>{info.user.refer_count}</td>
                            </tr>
                            <tr>
                                <td>Referred By</td>
                                <td>{info.user.referred_by ? info.user.referred_by : "-" }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>Referral Earned</h3>
                    <table className="referral">
                        <tbody>
                            <tr>
                                <td>Direct Referral Earnings</td>
                                <td>{referralData.directEarnings}</td>
                            </tr>
                            <tr>
                                <td>In-Direct Referral Earnings</td>
                                <td>{referralData.indirectEarnings}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="purchase">
                <form onSubmit={purchaseSubmit}>
                    <label>Purchase: </label>
                    <input placeholder='Total Purchase' name="purchase" />
                    <button type="submit">Purchase</button>
                </form>
            </div>
        </div>
    )
}


export default UserInfo;