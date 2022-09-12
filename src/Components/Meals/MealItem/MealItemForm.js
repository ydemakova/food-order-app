import classes from './MealItemForm.module.css'
import { useRef, useState } from 'react'

function MealItemForm(props) {
	const [amountIsValid, setAmountIsValid] = useState(true)

	const inputRef = useRef()

	const submitHandler = (event) => {
		event.preventDefault()
		const enteredAmount = +inputRef.current.value

		if (enteredAmount === 0 || enteredAmount > 20) {
			setAmountIsValid(false)
			return
		}
		props.onAddToCart(enteredAmount)
	}
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div>
				<label htmlFor="amount">Amount</label>
				<input
					ref={inputRef}
					className={classes.input}
					type="number"
					defaultValue="1"
					min="0"
					step="1"
					max="20"
				/>
			</div>

			<button>Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1 to 20)</p>}
		</form>
	)
}

export default MealItemForm
