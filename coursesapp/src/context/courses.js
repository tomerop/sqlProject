import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const CoursesContext=createContext();

function CoursesProvider (props){
    const navigator=useNavigate()
    const {children}=props;
    const [courses,setCourses]=useState([])
    const [myCourses, setMyCourses] = useState([]);
    const [errorMsg,setErrorMsg]=useState(null)
    let deleteInformation = {}
    const logOut = async function () {
        localStorage.removeItem('token');
        localStorage.removeItem('name');

        localStorage.removeItem('user_id');
    };
    const getAllCourses= async()=>{
        try {
            const response=await (await axios.get("http://localhost:4000/api/subjects")).data
            console.log(response)
            setCourses(response)
        } catch (error) {
            console.log(error)
        }
    }
    const userCourses=async()=>{
        const {user_id} = jwtDecode(localStorage.getItem('token'))
        console.log(user_id)
        try {
            const response=await (await axios.get(`http://localhost:4000/api/courses/${user_id}`)).data

            setMyCourses(response.rows)
            
        } catch (error) {
            console.log(error)
        }
    } 
    const addMe=async function (info){
        const add= await axios.post("http://localhost:4000/api/courses",info)
    }

    const signup = async function (e, registerInformation) {
        e.preventDefault();
        const {headers} = await axios.post("http://localhost:4000/api/users", {
            name: registerInformation.name,
            email: registerInformation.email,
            password: registerInformation.password,
        });
        localStorage.setItem('token',headers['x-auth-token'])
        localStorage.setItem('name',registerInformation.name)
        navigator('/')
        console.log(headers)
    };
    const pullMeOut=async function (info){
        deleteInformation= info
        console.log(info)
        const pullMe = await axios.post("http://localhost:4000/api/courses/deleteSub",info)
        userCourses()

    }

    const login = async function (e, loginInformation) {
       e.preventDefault();

       const login = await axios.post("http://localhost:4000/api/auth", {
            email: loginInformation.email,
            password: loginInformation.password,
        });
        localStorage.setItem("token", login.data.token);
        localStorage.setItem('name',login.data.name)
        localStorage.setItem('user_id',login.data.user_id)
        navigator('/')
    };

    return (
        <CoursesContext.Provider value={{pullMeOut,userCourses,myCourses,login,signup,logOut,addMe,courses,getAllCourses}}>
            {children}
        </CoursesContext.Provider>
    );
}

export default CoursesProvider;

