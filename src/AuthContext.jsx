import React, { useState } from "react";
import { createContext, useContext, useEffect } from "react";
import { auth } from '../firebase/firebase'
import axios from "axios";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        console.log("Error creating auth context")
    }
    return context;
}


export function AuthProvider({ children }) {

    const [user, setUser] = useState("")

    const [data, setData] = useState([])
    const [car, setCar] = useState([])

    useEffect(() => {
        axios("data.json").then((res) => setData(res.data))
    }, [])

    const buyProducts = (producto) => {
        const productoRepetido = car.find((item) => item.id === producto.id)

        if (productoRepetido) {
            setCar(car.map((item) => item.id === producto.id ? { ...producto, quanty: productoRepetido.quanty + 1 } : item))
        }
        else {
            setCar([...car, producto])
        }

    }

    const setLastPath = (path) => {
        localStorage.setItem("lastPath", path);
    };

    useEffect(() => {
        const unsuscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                console.log("No hay ningun usuario logeado")
                setUser("")
            } else {
                setUser(currentUser)
                const lastPath = localStorage.getItem("lastPath");
                if(lastPath){
                    localStorage.removeItem("lastPath")
                    window.location.href = lastPath;
                }
            }
        })
        return () => unsuscribed()
    }, [])





    const register = async (correo, password) => {
        const response = await createUserWithEmailAndPassword(auth, correo, password)
        console.log(response)
    }
    const login = async (correo, password) => {
        const response = await signInWithEmailAndPassword(auth, correo, password)
        console.log(response)
    }

    const loginWithGoogle = async () => {
        const responseGoogle = new GoogleAuthProvider()
        console.log(responseGoogle)
        return await signInWithPopup(auth, responseGoogle)

    }

    const loginWithFacebook = async () => {
        const responseFacebook = new FacebookAuthProvider()
        return await signInWithPopup(auth, responseFacebook)
    }


    const logout = async () => {
        const response = await signOut(auth)
        console.log(response)
    }

    const resetPassword = (email) => sendPasswordResetEmail(auth, email)



    return (
        <authContext.Provider
            value={{
                register,
                login,
                loginWithGoogle,
                loginWithFacebook,
                logout,
                resetPassword,
                user,
                data,
                car,
                setCar,
                buyProducts,
                setLastPath
            }}
        >
            {children}
        </authContext.Provider>
    )
}