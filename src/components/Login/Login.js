import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";
import './Login.css'

const Login = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const { user, login } = useAuth();
  const[showOtp,setshowOtp]=useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'mobile') {
      setMobile(value);
    } else if (name === 'otp') {
      setOtp(value);
    }
  };

  const configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA .
        onSignInSubmit();
        console.log('Recaptca verified');
      },
      defaultCountry: 'IN'
    });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = '+91' + mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {

        setConfirmationResult(confirmationResult);
        console.log('OTP has been sent');
        toast.success("Please check your mobile for OTP")
        setshowOtp(true)
      }).catch((error) => {
        // if  SMS not sent
        console.log(error);
        console.log('SMS not sent');
      });
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const code = otp;
    if (confirmationResult) {
      try {
        const result = await confirmationResult.confirm(code);
        // User signed in successfully.
        const user = result.user;
        const phoneNumber = user.phoneNumber;
        console.log(phoneNumber);
        console.log(JSON.stringify(user));
  
        toast.success("You have logged in Successfully");
        try {
          const docRef = addDoc(collection(db, 'usersCollection'), {
            name: name,
            phoneNumber: phoneNumber
          });
  
          navigate('/');
          console.log('user added to usersCollection');
        } catch (e) {
          console.error('Error adding user: ', e);
        }
      } catch (error) {
        console.log(error);
        
          toast.error("OTP Timeout. Please re-login and try again.");
      }
    }
  };

  return (
    <div className=' login-container mt-5'>
      <Toaster toastOptions={{ duration: 3000 }} />
      {showOtp ? (
          
        <>
        <div className='otp-form mt-5'>
        <h2 >Enter OTP</h2>
          <form onSubmit={onSubmitOTP}>
            <input type="number" name="otp" placeholder="OTP Number" required value={otp} onChange={handleChange} />
            <button className="btn btn-success mx-auto" type="submit">Submit</button>
          </form>
          
        </div>
        </>
      ) : (
        <><h2>Login Form</h2>
          <form className='login-form' onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            <input type="text" name="name" placeholder="Name" required value={name} onChange={handleChange} />
            <input type="number" name="mobile" placeholder="Mobile number" required value={mobile} onChange={handleChange} />
            <button type="submit">Submit</button>
          </form></>
      )}



    </div>
  );
};

export default Login;

