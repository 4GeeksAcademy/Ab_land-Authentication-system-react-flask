import React from 'react'
import { RegisterForm } from "../components/RegisterForm"
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from 'react-router-dom'

export const Private = () => {

    const [ token, setToken ] = useState(localStorage.getItem('jwt-token'))
    const [ apiData, setApiData] = useState('')
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()



    useEffect(() => {
        getPrivate()        
    }, [token,store.access]);

    function getPrivate() {
        const backendUrl = import.meta.env.VITE_BACKEND_URL        

        fetch(`${backendUrl}/private`, {
            method: "GET",            
            headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + token }
        })
            .then((response) => {
                if (!response.ok) { navigate('/')
                    throw new Error(`${response.status}, ${response.statusText}`);
                } console.log('response:',response);
                
                return response.json();
            })
            .then((data) => {
            console.log('data:',data);
            setApiData(data)
            dispatch({type:'set_access',payload:true});

            })
            .catch((error) => {
                console.error(error);
            })
    }
    return (
        <div className="d-flex-center-vh better-body">
            {!store.access  && (<h1>No permission, LogIn</h1>)}
            {store.access && (<h1>{apiData.msg}</h1>)}
        </div>
    )
}
