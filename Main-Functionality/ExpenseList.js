import React from "react";
import './ExpenseList.css';
import {db,auth} from "../components/Firebase-config";
import { useState , useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from "../Redux/CurrentUserSlice";
function ExpenseList() {
    const net1 =0;
    const [date, setDate] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [price, setPrice] = useState(0); 
    const dispatch = useDispatch();
    const currentUserEmail = auth.currentUser ? auth.currentUser.email : '';
    useEffect(()=>{
        if(currentUserEmail){
            dispatch(setCurrentUser(currentUserEmail));
        }
    },[])
    const currentUser= useSelector((state) => state.currentUser.value);
    console.log(currentUser)

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                
                console.log(currentUser)
                const snapshot = await db.collection('expense').where('user', '==', currentUser).get();
               
                
                snapshot.forEach(doc => {
                    const docData = doc.data(); 
                    console.log(docData)
                    setDate(docData.dates);
                    setDescription(docData.description);
                    setPrice(docData.Price);
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the async function
    }, [currentUser]);

    return (
        <div className="box">
            <div className="date">
                <div className="val">{date}</div>
                <div className="val">{description}</div>
            </div>
            <div className="amount">
            <div className="base">
            <div className="text"><p>paid by people</p></div>
            <div className="val">{price}</div>
            </div>
            <div className="base" >
            <div className="text"><p>borrow/lent</p></div>
            <div className="val">{net1}</div>
            </div>
            </div>
        </div>
    );

};

export default ExpenseList