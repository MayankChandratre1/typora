import { Session } from "next-auth"
import { useEffect, useState } from "react"

const useAuthSession =  () =>{
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        fetch("/api/auth/session").then(res=>res.json()).then(data=>{
          setSession(data)
          setLoading(false)
        })
      },[])
      return {
        session,
        loading
      }
}

export default useAuthSession