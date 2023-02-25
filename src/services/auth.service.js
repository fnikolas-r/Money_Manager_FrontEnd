import axios from "axios";

const API_URL= import.meta.env.VITE_API_URL


    async function login(username,password){
        return axios.post(API_URL +"login/",{username,password}).then(
            response =>{
                console.log(response)
                if (response.data.refresh){
                    localStorage.setItem("user-token",JSON.stringify(response.data))
                    return response.data

                }
            }
        ).then(r=>console.log(r.data))
    }

    function logout(){
        localStorage.removeItem("user-token")
        localStorage.removeItem("user-profile")
    }

    function sign_up(username, first_name, last_name, password, email, password2){
        return axios.post(API_URL+"register/",{username,first_name,last_name,password,password2,email
        })
    }

    function request_profile(){
    console.log(JSON.parse(localStorage.getItem("user-token")).access)
        return axios.get(API_URL+"login/profile/",{headers:
                { Authorization : `Bearer ${JSON.parse(localStorage.getItem("user-token")).access}`
            }
        }).then(response=>{
            if(response.data.username){
                localStorage.setItem("user-data",JSON.stringify(response.data))
                return response.data
            }
        }).catch(e=>{return {}})
    }

    function profile(){
        try {
            return JSON.parse(localStorage.getItem("user-profile"));
        }catch (e) {
            return {}
        }
    }
function refresh_token (){
    const token = JSON.parse(localStorage.getItem("user-token"))
    return axios.post(API_URL+"login/refresh/",{refresh:token.refresh}).then(response=>{
        const new_token = {
            ...token,access:response.data.access
        }
        localStorage.setItem("user-token", JSON.stringify(new_token));
        return new_token;
    })
}
const AuthService = {
    sign_up,
    login,
    logout,
    request_profile,
    refresh_token,
    profile
}

export default AuthService;