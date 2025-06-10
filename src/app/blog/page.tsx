  import { Footer } from "@/features/layout/components/footer";
import { mockRestaurants } from "@/features/restaurant/api/mock-restaurants";
import { RestaurantCard } from "@/features/restaurant/components/RestaurantCard";


export default function Page() {
	return (
		<>
		<RestaurantCard restaurant={mockRestaurants[0]} />
			<Footer />
		</>
	)
}
