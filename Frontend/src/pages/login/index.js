import Styles from '@/styles/Styles_pages/login.module.css'
import { useState } from 'react';
import client from "@/Services/helper";
import {useRouter} from "next/router";
import {success} from "@/Toast/toast";

const login = () => {
    const [isSignIn, setisSignIn] = useState(false);
    const[formValues,setFormValues] = useState({email:'', password:'', confirmPassword:''})
    const router = useRouter()
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const fd = new FormData(event.target);
        // let email = fd.get('email');
        // let password = fd.get('password');

        let data = Object.fromEntries(fd.entries());

        if(data.name){
            try {
                let response = await client.post('/auth/signUp',{
                    name:data.name,
                    email:data.email,
                    password:data.password,
                    verifypassword:data.verifypassword
                })

                if(response.status===200) {
                    success('SuccessFully Created new User !!')
                    router.push('/');
                }
                else
                    throw new Error();
            }catch (err) {
                console.log("Error is ",err)
            }
        }else{
            try {
                let response = await client.post('/auth/login',{
                    email:data.email,
                    password:data.password
                })
                if(response.status===200) {
                    success("Successful Login !!")
                    router.push('/');
                    localStorage.setItem('token',response.data.token);
                }
                else
                    throw new Error();
            }catch (err){
                console.log("Error is ",err)
            }
        }
    }

    return (
        <>
            <div className={Styles.body}>
                <div className={`${Styles.container} ${isSignIn && Styles.right_panel_active}`} id="container">
                    <div className={`${Styles.form_container} ${Styles.sign_up_container}`}>
                        <form className={Styles.form_element} onSubmit={handleSubmit}>
                            <h1 style={{color:"#35B729"}} className={Styles.header1}>Create Account</h1>
                            <div className={Styles.social_container}>
                                <a href="#" className={`${Styles.social} ${Styles.anchor}`}><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className={`${Styles.social} ${Styles.anchor}`}><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className={`${Styles.social} ${Styles.anchor}`}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className={Styles.spane}>or use your email for registration</span>
                            <input className={Styles.input_element} type="text" placeholder="Name" name="name" />
                            <input className={Styles.input_element} type="email" placeholder="Email" name="email"/>
                            <input className={Styles.input_element} type="password" placeholder="Password" name="password"/>
                            <input className={Styles.input_element} type="password" placeholder="Verfiy Password" name="verifypassword"/>
                            <button style={{backgroundColor:"#35B729",border:'none',cursor:"pointer"}} className={Styles.btn}>Sign Up</button>
                        </form>
                    </div>
                    <div style={{color:"#35B729"}} className={`${Styles.form_container} ${Styles.sign_in_container}`}>
                        <form className={Styles.form_element} onSubmit={handleSubmit}>
                            <h1 className={Styles.header1}>Sign in</h1>
                            <div className={Styles.social_container}>
                                <a href="#" className={`${Styles.social} ${Styles.anchor}`}><i className="fab fa-facebook-f"></i></a>
                                <a href="#"className={`${Styles.social} ${Styles.anchor}`}><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className={`${Styles.social} ${Styles.anchor}`}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className={Styles.spane}>or use your account</span>
                            <input className={Styles.input_element} type="email" placeholder="Email" name="email" />
                            <input className={Styles.input_element} type="password" placeholder="Password" name="password"/>
                            <a href="#">Forgot your password?</a>
                            <button style={{backgroundColor:"#35B729",marginTop:'1rem',border:'none',cursor:"pointer"}} className={Styles.btn}>Sign In</button>
                        </form>
                    </div>
                    <div className={Styles.overlay_container}>
                        <div className={Styles.overlay}>
                            <div className={`${Styles.overlay_panel} ${Styles.overlay_left}`}>
                                <h1 className={Styles.header1}>Welcome Back!</h1>
                                <p className={Styles.para}>To keep connected with us please login with your personal info</p>
                                <button style={{cursor:"pointer"}} onClick={() => { setisSignIn(false) }} className={`${Styles.ghost} ${Styles.btn}`} id="signIn">Sign In</button>
                            </div>
                            <div className={`${Styles.overlay_panel} ${Styles.overlay_right}`}>
                                <h1 className={Styles.header1}>Hello, Friend!</h1>
                                <p className={Styles.para}>Enter your personal details and start journey with us</p>
                                <button style={{cursor:"pointer"}} onClick={() => { setisSignIn(true) }} className={`${Styles.ghost} ${Styles.btn}`} id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login;