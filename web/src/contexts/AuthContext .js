import React, {useContext, useEffect, useState} from "react"
import {auth} from "./firebase"

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,updatePassword, updateEmail

} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [currentUserAccountType, setCurrentUserAccountType] = useState()
    const [loading, setLoading] = useState(true)
    const [addingUser, setAddingUser] = useState(false)

    function signupStaff(email, password, firstName, middleName, lastName, buildingNumber, streetNumber, postalCode, country, city, province) {

        return createUserWithEmailAndPassword(auth, email, password).then(function (data) {
            setAddingUser(true)
            console.log('uid', data.user.uid) // used to access user right after account creation
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
                } else {
                    setCurrentUserAccountType("Staff")
                }


            }).then( async () => {

                setAddingUser(false)
                await auth.currentUser.reload();


            }).finally(setAddingUser(false))

        })

    }

    function signUpCustomer(email, password, firstName, middleName, lastName, buildingNumber, streetNumber, postalCode, country, city, province, expirationDate, creditCardNumber, cvv) {
        setAddingUser(true)
        return createUserWithEmailAndPassword(auth, email, password).then(function (data) {
            console.log('uid', data.user.uid) // used to access user right after account creation

            const data_customer = {
                "userId": data.user.uid,
                "firstName": firstName,
                "middleName": middleName,
                "lastName": lastName,
                "billingAddress": {
                    "buildingNumber": buildingNumber,
                    "street": streetNumber,
                    "city": city,
                    "province": province,
                    "postalCode": postalCode,
                    "country": country
                },
                "card": {
                    "number": creditCardNumber,
                    "expirationDate": expirationDate,
                    "cvv": cvv
                }
            };

            // Post request using fetch with error handling
            fetch('http://localhost:5000/api/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_customer),
            }).then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

            }).then( async () => {

                setAddingUser(false)
                await auth.currentUser.reload();


            }).finally(setAddingUser(false))



        })


    }


    function login(email, password) {
        return signInWithEmailAndPassword(auth,email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth,email)
    }

    function updateEmailCurrentUser(email)     {
        console.log(email)
        return updateEmail(currentUser,email)
    }

    function updatePasswordCurrentUser(password) {
        console.log(password)
        return updatePassword(currentUser,password)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user)

            if (user && !addingUser) {

                fetch('http://localhost:5000/api/accountType?userId=' + user.uid, {method: 'GET'})
                    .then(async response => {
                        response.text().then(function (accountType) {
                            // do something with the text response
                            setCurrentUserAccountType(accountType)
                        });

                    })
                    .catch(error => {

                        if (error === 404) {
                            alert("No user specified userId")
                        } else {
                            alert("Error getting user")
                        }


                    });

            }

            else {
                setCurrentUserAccountType(null)
            }


            setLoading(false)

        })
    }, [])

    const value = {
        currentUser,
        currentUserAccountType,
        login,
        signupStaff,
        signUpCustomer,
        logout,
        updateEmailCurrentUser,
        updatePasswordCurrentUser,
        resetPassword,

    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}