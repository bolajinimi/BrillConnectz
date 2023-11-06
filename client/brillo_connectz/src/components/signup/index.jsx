import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    interest: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const interests = [
    "Soccer (Football)",
    "Basketball",
    "Tennis",
    "Swimming",
    "Cricket",
    "Baseball",
    "Golf",
    "Rugby",
    "Cycling",
  ];

  /**
1. **Soccer (Football)**
2. **Basketball**
3. **Tennis**
4. **Swimming**
5. **Cricket**
6. **Baseball**
7. **Golf**
8. **Athletics (Track and Field)**
9. **Rugby**
10. **Cycling**
11. **Boxing**
12. **Hockey**
13. **Volleyball**
14. **Table Tennis**
15. **Badminton**
16. **Martial Arts**
17. **Skiing**
18. **Snowboarding**
19. **Sailing**
20. **Gymnastics**
 */

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
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
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>

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
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              value={data.phoneNumber}
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
            <select
              name="interest"
              id={styles.select}
              className={styles.input}
              value={data.interest}
              onChange={handleChange}
              required
            >
              <option label="Select an Interest" value=""></option>
              {interests.map((interest) => (
                <option key={interest}>{interest}</option>
              ))}
            </select>
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
