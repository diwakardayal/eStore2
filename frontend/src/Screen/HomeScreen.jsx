import { useGetProductsQuery } from "../slices/productsApiSlice"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"

export default function HomeScreen() {
	// eslint-disable-next-line no-unused-vars
	const { data: products, isLoading, error } = useGetProductsQuery()
	console.log("error: ", error)
	console.log("products: ", products)
	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products &&
					products.length > 0 &&
					products.map(product => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
			</Row>
		</>
	)
}
