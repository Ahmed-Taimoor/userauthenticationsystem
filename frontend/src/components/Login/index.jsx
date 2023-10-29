import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/auth';
      const { data: res } = await axios.post(url, data);
      localStorage.setItem('token', res.data);
      window.location('/');
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
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_conainer} onSubmit={handleSubmit}>
              <h1>Login to your account </h1>
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
                Sign In
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
