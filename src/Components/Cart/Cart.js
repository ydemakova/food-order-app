import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import cartContext from '../../Components/Meals/store/cart-context'
import CartItem from './CartItem'
import React, { useContext } from 'react'
import Checkout from './Checkout'
import { useState } from 'react'

function Cart(props) {
	const [isCheckout, setIsCheckout] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const cartCtx = useContext(cartContext)

	const totalAmount = cartCtx.totalAmount.toFixed(2)

	const hasItems = cartCtx.items.length > 0

	const cartItemRemoveHandler = (id) => {
		cartCtx.deleteItem(id)
	}

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: +1 })
	}

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<li>
					<CartItem
						key={item.id}
						name={item.name}
						price={item.price}
						amount={item.amount}
						onAdd={cartItemAddHandler.bind(null, item)}
						onRemove={cartItemRemoveHandler.bind(null, item.id)}
					/>
				</li>
			))}
		</ul>
	)
	const orderHandler = () => {
		setIsCheckout(true)
	}

	const submitOrderHandler = async (userData) => {
		await fetch('https://food-order-app-89e7a-default-rtdb.firebaseio.com/orders.json', {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items,
			}),
		})
		setIsSubmitted(true)
		cartCtx.clearCart()
	}

	const cartContent = (
		<React.Fragment>
			{cartItems}
			{isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>€ {totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{hasItems && (
					<button onClick={orderHandler} className={classes.button}>
						Order
					</button>
				)}
			</div>
		</React.Fragment>
	)
	return (
		<Modal onClose={props.onClose}>
			{!isSubmitted && cartContent}
			{isSubmitted && <p>Your order is on the way!</p>}
		</Modal>
	)
}

export default Cart
