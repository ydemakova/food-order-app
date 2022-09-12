import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../Meals/store/cart-context'
import { useContext } from 'react'

function HeaderCartButton(props) {
	const cartCtx = useContext(CartContext)

	const totalAmountOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
		return currentNumber + item.amount
	}, 0)

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{totalAmountOfCartItems}</span>
		</button>
	)
}

export default HeaderCartButton
