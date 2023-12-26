import { useGetProductsQuery } from "../slices/productsApiSlice"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import ProductCarousel from "../components/ProductCarousel"
import { useParams } from "react-router-dom"

export default function HomeScreen() {
	const { keyword } = useParams()
	// eslint-disable-next-line no-unused-vars
	const { data: products, isLoading, error } = useGetProductsQuery(keyword)
	console.log("error: ", error)
	console.log("products: ", products)
	return (
		<>
			<ProductCarousel />
			<h1>Latest Products</h1>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message>{error?.data?.message || error.error}</Message>
			) : (
				<Row>
					{products &&
						products.length > 0 &&
						products.map(product => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
				</Row>
			)}
		</>
	)
}
