import React, { useState } from "react";
import "./EmailSelector.css";
import Button from '@mui/material/Button';
import {db,auth} from "../components/Firebase-config";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from "../Redux/CurrentUserSlice";
import { addTodo } from '../Redux/GuestUserSlice';


const EmailSelector=({ setStatus, setStatus2 })=> {
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [emailInput, setEmailInput] = useState("");
    const dispatch = useDispatch();
    const currentUserEmail = auth.currentUser.email;

    useEffect(()=>{
        if(currentUserEmail){
            dispatch(setCurrentUser(currentUserEmail));
        }
    },[])


    const currentUser= useSelector((state) => state.currentUser.value);
    const guest = useSelector(state => state.todos);


    const addEmail = async () => {
        if (emailInput.trim() !== "" && !selectedEmails.includes(emailInput)) {
            setSelectedEmails((prev) => [...prev, emailInput]);
            setEmailInput("");
        }
    
    
    };
    
    const removeEmail = (email) => {
        const updatedEmails = selectedEmails.filter(item => item !== email);
        setSelectedEmails(updatedEmails);
    };
    const saving = () =>{
        setStatus(false);
        setStatus2(true);
        dispatch(addTodo(selectedEmails));
        setSelectedEmails([]);
    }

    
console.log(selectedEmails)
    return (
        <div className="form-Containers">
            <form className="form1">
                <h3>Add an expense</h3>
                <div className="email-input-container">
                    {selectedEmails.map(email => (
                        <div key={email} className="selected-email">
                            {email}
                            <Button variant="contained" color='error' size="small" onClick={() => removeEmail(email)}>Remove</Button>
                        </div>
                    ))}
                    <input
                        type="email"
                        placeholder="Add Email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                </div>
                <Button variant="contained" color='success' onClick={addEmail}>Add</Button>
                <Button variant="contained" color='success'>Cancel</Button>
                <Button variant="contained" color='success' onClick={saving}>Save</Button>
            </form>
        </div>
    );
}

export default EmailSelector;

