import React, {useContext, useEffect, useState} from "react"
import {auth} from "./firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signupStaff(email, password, firstName, middleName, lastName, buildingNumber, streetNumber, postalCode, country, city, province) {

        return createUserWithEmailAndPassword(auth, email, password).then(function (data) {
            console.log('uid', data.user.uid) // used to access user right after account creation
            setCurrentUser(data.user)


            const data_staff = {
                "userId": data.user.uid,
                "firstName": firstName,
                "middleName": middleName,
                "lastName": lastName,
                "homeAddress": {
                    "buildingNumber": buildingNumber,
                    "street": streetNumber,
                    "city": city,
                    "province": province,
                    "postalCode": postalCode,
                    "country": country
                }
            };

            // Post request using fetch with error handling
            fetch('http://localhost:5000/api/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_staff),
            }).then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }


            }).catch(error => {

                alert("Error posting staff: " + error)

            });


        })


    }

    function login(email, password) {
        return signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    const value = {
        currentUser,
        login,
        signup: signupStaff,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}