import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import styles from "./styles.module.css";

const Signup = () => {
	const [signupMessage, setSignupMessage] = useState('');
	const [errorMessage, setError] = useState('');
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
   /* const handleSubmit = async () => {
    try {
      if (!data.firstName || !data.email || !data.password) {
        setErrorMessage('All fields are required');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        setErrorMessage('Invalid email format');
        return;
      }

      const response = await axios.post('http://localhost:3500/signup', 
        data
      );
      setSignupMessage(response.data.message);
	  navigate('/home')
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          if (data.message === 'User already exists') {
            setErrorMessage('User already exists. Please sign in instead.');
          }
        }
      } else {
        setErrorMessage('Signup failed. Please try again later.');
      }
    }
  };*/
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3500/signup";
			const { data: res } = await axios.post(url, data);
				setSignupMessage(res.message);
				toast.success("Sign up successful.Please check Email for confirmation")
			    console.log(res.message);
				setTimeout(() => {
					navigate("/signin");
				  }, 3000); //

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div>
			<Toaster position="top-center" toastOptions={{ duration: 2000 }} />
	
		    <div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/signin">
						<button type="button" className={styles.white_btn}>
							Sing in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						{errorMessage && <p>{errorMessage}</p>}
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						
						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>

					</form>
				</div>
			</div>
		</div>

		</div>
	);
};

export default Signup;
