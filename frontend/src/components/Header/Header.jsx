import { useEffect } from "react"
import { BsCartDashFill } from "react-icons/bs"
import { BiSolidUser } from "react-icons/bi"
import { useSelector } from "react-redux"
import { Badge } from "react-bootstrap"
import "./Header.css"

export default function Header() {
	const { cartItems } = useSelector(state => state.cart)

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
						style={{ display: "flex", justifyItems: "center", gap: ".4rem" }}
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
					<div
						style={{ display: "flex", justifyItems: "center", gap: ".4rem" }}
						className="headerSignIn"
					>
						<BiSolidUser /> Sign In
					</div>
				</div>
			</nav>
		</div>
	)
}
