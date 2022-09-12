import React from 'react'
import mealsImage from '../../assets/meals.jpeg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

function Header(props) {
	return (
		<React.Fragment>
			<header className={classes.header}>
				<h1>Best meals of the city</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={classes['main-image']}>
				<img src={mealsImage} alt="Image of foods" />
			</div>
		</React.Fragment>
	)
}

export default Header
