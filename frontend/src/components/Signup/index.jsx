import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import { useState } from 'react';
import axios from 'axios';
const Signup = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/users';
      const { data: res } = await axios.post(url, data);
      navigate('/login');
      console.log(res.message);
    } catch (error) {
      if (
        error.responce &&
        error.responce.status >= 400 &&
        error.responce.status <= 500
      ) {
        setError(error.responce.message);
      }
    }
  };

  return (
    <div>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Sign in
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_conainer} onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={data.firstName}
                className={styles.input}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={data.lastName}
                className={styles.input}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email "
                name="email"
                value={data.email}
                className={styles.input}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password "
                name="password"
                value={data.password}
                className={styles.input}
                onChange={handleChange}
              />
              {error && <div className={styles.error_msg}> {error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
