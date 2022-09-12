import classes from './Checkout.module.css'
import { useRef, useState } from 'react'

const isEmpty = (value) => value.trim() === ''

function Checkout(props) {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		address: true,
	})

	const nameRef = useRef()
	const addressRef = useRef()

	const submitHandler = (event) => {
		event.preventDefault()

		const userName = nameRef.current.value
		const userAddress = addressRef.current.value

		const userNameIsValid = !isEmpty(userName)
		const userAddressIsValid = !isEmpty(userAddress)

		setFormInputsValidity({
			name: userNameIsValid,
			address: userAddressIsValid,
		})
		const formIsValid = userNameIsValid && userAddressIsValid

		if (!formIsValid) {
			return
		}

		props.onConfirm({
			name: userName,
			address: userAddress,
		})
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameRef} />
				{!formInputsValidity.name && <p className={classes.failure}>Please enter a valid name!</p>}
			</div>
			<div className={classes.control}>
				<label htmlFor="address">Delivery Address</label>
				<input type="text" id="address" ref={addressRef} />
				{!formInputsValidity.address && <p className={classes.failure}>Please enter a valid address!</p>}
			</div>
			<button type="button" onClick={props.onCancel}>
				Cancel
			</button>

			<button className={classes.confirm} onClick={props.onConfirm}>
				Confirm
			</button>
		</form>
	)
}

export default Checkout
