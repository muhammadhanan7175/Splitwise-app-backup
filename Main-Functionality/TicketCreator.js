import React, { useState } from "react";
import Button from '@mui/material/Button';
import { db, auth } from "../components/Firebase-config";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { addTodo, getTodos } from '../Redux/GuestUserSlice';



function TicketCreator({ setStatus2, onCancel }) {

    const [description, setDescription] = useState("");
    const [paid, setPaid] = useState([]);
    const [toPay, setToPay] = useState([]);
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const currentUser = useSelector((state) => state.currentUser.value);
    // const selectedEmails = useSelector((state) => state.todos); // Assuming you have guestUser slice in your Redux store
    const dispatch = useDispatch();
    const [splitToggle, setsplitToggle] = useState(false);
    const [paidToggle, setpaidToggle] = useState(false);
    const currentUserEmail = auth.currentUser ? auth.currentUser.email : '';

    const selectedEmails = useSelector(getTodos);
    console.log("todos", selectedEmails)

    var userToPay;
    var userPaid;

    const handleSave = async () => {
        const newExpense = {
            Description: description,
            Price: price,
            dates: date,
        };

        const expenseData = {
            Description: description,
            Price: price,
            dates: date,
            user: currentUser,
        };

        // Add user fields to the expenseData based on selectedEmails array
        selectedEmails.forEach((email, index) => {
            expenseData[`user${index + 1}`] = email;
        });

        const usersRef = db.collection("expense").doc();
        const res = await usersRef.set(expenseData);
        setStatus2(false);
        dispatch(addTodo([]));
        

        // Clear form fields after saving
        setDescription("");
        setPrice("");
        setDate("");
    };

    function handleSplit(){
            setsplitToggle(true)
    };

    function handlePaid(){
        
        setpaidToggle(true)
    };
        const handleToPayChange = (index, value) => {
        const updatedToPay = [...toPay];
        updatedToPay[index] = value;
        setToPay(updatedToPay);
    };
    const handleSplitSubmit = () =>{
        const totalToPay = toPay.reduce((sum, value) => sum + parseFloat(value || 0), 0);  
       if(totalToPay === price)
       {
        setsplitToggle(false);
       }
       else{
        // toast.error("the entered amount either exceeds or deceases the total sahred amount")
       }

    }
    const handlePaidChange = (index, value) => {
        const updatedPaid = [...paid];
        updatedPaid[index] = value;
        setPaid(updatedPaid);
    };
    const handlePaidSubmit= () =>{
        const totalToPaid = paid.reduce((sum, value) => sum + parseFloat(value || 0), 0);  
       if(totalToPaid == price)
       {
        setpaidToggle(false);
       }
       else{
        // toast.error("the entered amount either exceeds or deceases the total sahred amount")
       }
    }

    return (
        <div>
            
            <div>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="customButtons">
                <Button onClick={handlePaid}>Paid</Button>
                <Button onClick={handleSplit}>Split</Button>
            </div>
            <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
            <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
            {splitToggle && (
                <>
                    {/* <div>
                         <label>{`User (You) (${currentUserEmail}):`}</label>
                            <input
                                type="number"
                                placeholder="Amount to Pay"
                                value={toPay[0] || ""}
                                onChange={(e) => handleToPayChange(0, e.target.value)}
                            />
                    </div> */}
                    {selectedEmails.map((email, index) => (
                        <div key={index}>
                            <label>{`User ${index + 1} (${email}):`}</label>
                                <input
                                    type="number"
                                    placeholder="Amount to Pay"
                                    value={toPay[index] || ""}
                                    onChange={(e) => handleToPayChange(index, e.target.value)}
                                />
                        </div>
                    ))}
                    <Button variant="contained" color="primary" onClick={handleSplitSubmit}>Submit Split</Button>
                    
                </>
            )}

{paidToggle && (
                <>
                                    {/* <div>
                         <label>{`User (You) (${currentUserEmail}):`}</label>
                            <input
                                type="number"
                                placeholder="Amount to Pay"
                                value={toPay[0] || ""}
                                onChange={(e) => handlePaidChange(0, e.target.value)}
                            />
                    </div> */}
                    {selectedEmails.map((email, index) => (
                        <div key={index}>
                            <label>{`User ${index + 1} (${email}):`}</label>
                            <input
                                type="number"
                                placeholder="Amount Paid"
                                value={paid[index] || ""}
                                onChange={(e) => handlePaidChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <Button variant="contained" color="primary" onClick={handlePaidSubmit}>Submit Paid</Button>
                </>
                
            )}
        </div>
    );
    
}

export default TicketCreator;

