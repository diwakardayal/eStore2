import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetUsersQuery } from "../../slices/usersApiSlice"

const UserListScreen = () => {
	const { data: users, isLoading, error } = useGetUsersQuery()

	const deleteHandler = () => {}

	return (
		<>
			<h1>Users</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
						</tr>
					</thead>
					{users.map(user => (
						<tr key={user._id}>
							<td>{user._id}</td>
							<td>{user.name}</td>
							<td>
								<a href={`mailto:${user.email}`}>{user.email}</a>
							</td>
							<td>
								{user.isAdmin ? (
									<FaCheck style={{ color: "green" }} size={25} />
								) : (
									<FaTimes style={{ color: "red" }} size={25} />
								)}
							</td>

							<td>
								<LinkContainer to={`/admin/user/${user._id}/edit`}>
									<Button variant="light" className="btn-sm">
										<FaEdit />
									</Button>
								</LinkContainer>
								<Button
									variant="danger"
									className="btn-sm"
									onClick={() => deleteHandler(user._id)}
								>
									<FaTrash style={{ color: "red" }} />
								</Button>
							</td>
						</tr>
					))}
				</Table>
			)}
		</>
	)
}

export default UserListScreen
