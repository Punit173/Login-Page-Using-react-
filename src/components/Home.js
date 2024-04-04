import React, { useState } from 'react'
import logo from './logo.svg';
import Login from './Login';
import './Home.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';


export default function Home() {
    const [values,setValues] = useState({
        name:"",
        email:"",
        pass:""
    })

    const [values1,setValues1] = useState({
        email:"",
        pass:""
    })

    const [errorMsg,setErrorMsg] = useState("");
    const [errorMsg1,setErrorMsg1] = useState("");
    const [submitButtonDisabled,setSubmissionButtonDisabled] = useState(false);

    const handleSubmission=(e) => {
        if(!values.name || !values.email || !values.pass){
            setErrorMsg("Fill all the fields");
        }
        setErrorMsg("");

        setSubmissionButtonDisabled(true);
        e.preventDefault();
        console.log(values);
        createUserWithEmailAndPassword(auth,values.email,values.pass).then(async(res)=>{
            setSubmissionButtonDisabled(false);
            console.log(res);
            const user=res.user;
            await updateProfile(user,{
                displayName:values.name,
            });
            alert("Profile created!!");
            console.log(user);
        }).catch(err=>{
            setSubmissionButtonDisabled(false);
            setErrorMsg(err.message);
            console.log("Error=",err.message);
        })
    }

    const handleSubmission1=(e) => {
        if(!values1.email || !values1.pass){
            setErrorMsg("Fill all the fields");
        }
        setErrorMsg("");
        setSubmissionButtonDisabled(true);
        signInWithEmailAndPassword(auth,values1.email,values1.pass).then(async(res)=>{
            setSubmissionButtonDisabled(false);
            alert("Login Successful!!");
            e.preventDefault();
            console.log("Login successful");
        }).catch(err=>{
            setSubmissionButtonDisabled(false);
            setErrorMsg(err.message);
            console.log("Error=",err.message);
        })
    }

    const [action,setaction] = useState("Intro");
    var show = document.getElementById('showpass');
    var eyeopen = document.getElementById('see');
    eyeopen.onclick = () => {
        show.setAttribute('TYPE','TEXT');
    }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={action==="Login" || action==="SignUp"?"App-logo hide":"App-logo show"} alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <div className={action==="Login"?"show login":"hide"}>
            <form action="" className='login'>
                <h1>LOGIN</h1>
                <input type="text" name='username' id='' placeholder='Username' required onChange={event=>setValues1(prev=>({ ...prev,email: event.target.value}))}/>
                <div className='privacy'>
                <input type="password" name="password" placeholder='Password' id="showpass" required onChange={event=>setValues1(prev=>({ ...prev,pass: event.target.value}))}/>
                <img src={logo} id='see'/>
                </div> 
                <p className='error'>{errorMsg}</p>
                <p className='forg-pass'><a href=""><span>Click Here</span></a> to forget password</p>
                <button className='btn btn-primary' disabled={submitButtonDisabled} onClick={handleSubmission1}>SignIn</button>
            </form>
        </div>

        <div className={action==="SignUp"?"show login":"hide"}>
            <form action="" className='login'>
                <h1>SignUp</h1>
                <input type="text" name='name' id='' placeholder='Your Name'  required  onChange={event=>setValues(prev=>({ ...prev,name: event.target.value}))}/>
                <input type="email" placeholder='Your Email' name='email'  required onChange={event=>setValues(prev=>({ ...prev,email: event.target.value}))}/>
                <input type="password" name="password" placeholder='Your Password' id="" required  onChange={event=>setValues(prev=>({ ...prev,pass: event.target.value}))}/>
                <button className='btn btn-primary button' onClick={handleSubmission} disabled={submitButtonDisabled}>Submit</button>
                <p className='error'>{errorMsg}</p>
                <p className='forg-pass'>Already have an account? <a href=""><span>Click Here</span></a></p>
            </form>
        </div>

        <div className="d-inline-flex column-gap-3 my-2">
          <button className="btn btn-primary g-col-5" onClick={()=>{setaction("Login")}}>LogIn</button>
          <button className="btn btn-secondary g-col-5" onClick={()=>{setaction("SignUp")}}>SignUp</button>
        </div>
      </header>
    </div>
  )
}
