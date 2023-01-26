import React, {useCallback, useContext, useEffect, useState} from "react";
import HeadBar from "../components/navigation/HeadBar";
import {AuthContext, getUserEmail} from "../authConfig/Authentication";
import ProfileForm from "../components/userProfile/ProfileForm";
import {getUserByEmail} from "../api/Users/apiCalls";
import {User} from "../api/Users/types";
import {ReservationResponse} from "../api/Movies/types";
import {getUserReservations} from "../api/Movies/apiCalls";

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();
    const [userId, setUserId] = useState<number>()
    const [reservations, setReservations] = useState<ReservationResponse[]>()
    const {token} = useContext(AuthContext);

    const loadUser = useCallback(async () => {
        setLoading(true);

        let email = getUserEmail(token);

        await getUserByEmail(email)
            .then((response) => {
                setUser(response.data);
                setUserId(response.data.id);
            })
            .catch(() => setUser(undefined))
            .finally(() => setLoading(false));
    }, [token]);

    const loadReservations =  useCallback(async (userId:string)=>{

        setLoading(true);


        await getUserReservations(userId)
            .then((response)=>{
                setReservations(response.data)
            })
            .catch(()=>setReservations(undefined))
            .finally(()=>setLoading(false));

    },[setReservations]);


    useEffect(() => {
        void loadUser()
        if(userId)void loadReservations(userId.toString())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadUser,loadReservations,userId]);

    return (
        <div className="mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen ">
            <HeadBar haveNav={true}/>
            <ProfileForm user={user} reservations={reservations}/>
        </div>)
}
export default ProfilePage;