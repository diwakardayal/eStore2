import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { BsCartDashFill } from "react-icons/bs"
import { BiSolidUser } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import { Badge, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import "./Header.css"
import { Link } from "react-router-dom"
import { useLogoutMutation } from "../../slices/usersApiSlice"
import { logout } from "../../slices/authSlice"

export default function Header() {
	const { cartItems } = useSelector(state => state.cart)
	const { userInfo } = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [logoutApiCall] = useLogoutMutation()

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			navigate("/login")
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		try {
			const toggleButtons = document.getElementsByClassName("toggle-buttons")[0]
			const navLinks = document.getElementsByClassName("navlinks")[0]

			toggleButtons.addEventListener("click", () => {
				navLinks.classList.toggle("active")
			})
		} catch (e) {
			console.log(e)
		}
	}, [])

	return (
		<div className="wrapper">
			<nav>
				<div className="logo">eStore</div>
				<div className="toggle-buttons">
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</div>
				<div className="navlinks">
					<div style={{ display: "flex", justifyItems: "center", gap: ".4rem" }}>
						<input className="searchInputBox" placeholder="Search Products..." />
						<button className="searchButton">Search</button>
					</div>
					<div
						style={{
							display: "flex",
							justifyItems: "center",
							gap: ".4rem",
							alignItems: "center",
						}}
						className="headerCart"
					>
						<BsCartDashFill />
						Cart
						{cartItems.length > 0 && (
							<Badge pill bg="success">
								{cartItems.reduce((a, c) => a + c.quantity, 0)}
							</Badge>
						)}
					</div>
					{userInfo ? (
						<>
							<NavDropdown title={userInfo.name} id="username">
								<LinkContainer to="/profile">
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
							</NavDropdown>
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin" id="adminmenu">
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</>
					) : (
						<Link to="/login">
							<div
								style={{
									display: "flex",
									justifyItems: "center",
									gap: ".4rem",
									alignItems: "center",
								}}
								className="headerSignIn"
							>
								<BiSolidUser /> Sign In
							</div>
						</Link>
					)}
				</div>
			</nav>
		</div>
	)
}
