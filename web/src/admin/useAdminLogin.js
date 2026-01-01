import { useEffect, useState } from 'react'
import { requestAdminLogin } from './AdminLoginApi'

export const useAdminLogin = (username, password) => {



    const submit = async()=>{
        try{
            await requestAdminLogin(username, password)
        } catch(e) {
            console.log(e)
        }
    }

    return {
        submit
    }
}