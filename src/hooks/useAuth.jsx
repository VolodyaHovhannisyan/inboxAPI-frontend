import { useEffect, useState } from "react"

export default function useAuth() {
    const [user, setUser] = useState(false)

    function setUserTrue() {
        return setUser(true)
    }

    let currentUser

    useEffect(() => {
        if (localStorage.getItem('user')) {
            currentUser = localStorage.getItem('user').user
            setUser(true)
        } else {
            setUser(false)
        }
        return () => {
            if (localStorage.getItem('user')) {
                currentUser = localStorage.getItem('user').user
                setUser(true)
            } else {
                setUser(false)
            }
        }
    }, [user])



    return { user, setUser, currentUser, setUserTrue }
}

