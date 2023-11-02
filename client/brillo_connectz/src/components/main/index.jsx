import styles from "./styles.module.css";
// import { Link } from "react-router-dom";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>BrilloConnectz</h1>
{/* 
                <div>
                    <Link>Profile </Link>
                    <Link>Buddies </Link>
                    <Link>Discover </Link>
                    <Link>Settings & Privacy </Link>

                </div> */}
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;