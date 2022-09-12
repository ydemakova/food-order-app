import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals'
import Cart from './Components/Cart/Cart'
import { useState } from 'react'
import CartProvider from './Components/Meals/store/CartProvider'

function App() {
	const [cartIsShown, setCartIsShown] = useState(false)

	const showCartHandler = () => {
		setCartIsShown(true)
	}

	const hideCartHandler = () => {
		setCartIsShown(false)
	}

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<Meals />
		</CartProvider>
	)
}

export default App
