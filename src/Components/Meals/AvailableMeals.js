import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import { useEffect, useState } from 'react'

function AvailableMeals() {
	const [isLoading, setIsLoading] = useState(true)
	const [meals, setMeals] = useState([])
	const [httpError, setHttpError] = useState(null)

	useEffect(() => {
		const fetchMeals = async () => {
			//Data is stored in Firebase
			const response = await fetch('https://food-order-app-89e7a-default-rtdb.firebaseio.com/meals.json')

			if (!response.ok) {
				throw new Error('Bad request')
			}

			const responseData = await response.json()
			const loadedMeals = []
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					description: responseData[key].description,
					price: responseData[key].price,
					name: responseData[key].name,
				})
			}
			setMeals(loadedMeals)
			setIsLoading(false)
		}

		fetchMeals().catch((error) => {
			setIsLoading(false)
			setHttpError(error.message)
		})
	}, [])

	if (httpError) {
		return (
			<section>
				<p className={classes['http-error']}>{httpError}</p>
			</section>
		)
	}

	const mealsList = meals.map((meal) => {
		return (
			<MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
		)
	})

	return (
		<section className={classes.meals}>
			{isLoading && <p className={classes.loading}>Loading...</p>}
			{!isLoading && (
				<Card>
					<ul>{mealsList}</ul>
				</Card>
			)}
		</section>
	)
}

export default AvailableMeals
