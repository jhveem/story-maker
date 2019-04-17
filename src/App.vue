<template>
	<div id="app">
		<div class="pure-menu pure-menu-horizontal">
			<span class="pure-menu-heading">Story Builder</span>
			<ul class="pure-menu-list">
				<li class="pure-menu-item">
					<router-link to="/" class="pure-menu-link">Home</router-link>
				</li>
				<li class="pure-menu-item">
					<router-link to="/mystories" class="pure-menu-link">My Stories</router-link>
				</li>
				<li class="pure-menu-item">
					<router-link to="/story" class="pure-menu-link">New Story</router-link>
				</li>
				<li class="pure-menu-item">
					<a href="https://github.com/BYU-CS-260-Winter-2019/lab-5-jhveem" class="pure-menu-link">git</a>
				</li>
			</ul>
		</div>
		<div class="content">
			<router-view />
		</div>
	</div>
</template>

<style>
/* https://color.adobe.com/Ventana-Azul-color-theme-2159606/?showPublished=true */
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 18px;
	min-height: 100%;
}
.pure-menu {
	/* To limit the menu width to the content of the menu: */
	/* display: inline-block;*/
	/* Or set the width explicitly: */
	text-align: left;
	background: #000;
}

.pure-menu-heading {
	color: #fff;
	font-size: 1.2em;
	background-color: #396;
}

.pure-menu-link {
	color: #fff;
	padding: 11px 20px;
	font-weight: 800;
}

.pure-menu-link:hover {
	background: #333;
}

.pure-menu-link.router-link-exact-active {
	height: 100%;
	background: #fff;
	color: #396
}

.content {
	margin: 50px 100px;
}

html {
	height: 100%;
	box-sizing: border-box;
}

body {
	height: 100%;
}

*,
*:before,
*:after {
	box-sizing: inherit;
	/*https://css-tricks.com/box-sizing/ */
}

.error {
	color: #F2385A;
}

.pure-button-primary {
	border: none;
	padding: 5px 10px;
	border-radius: 5px;
	background: none;
	background-color: #396;
}

/* Modals */
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	display: table;
	transition: opacity .3s ease;
}

.modal-wrapper {
	width: 500px;
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	transition: all .3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 {
	margin-bottom: 30px;
	font-size: 1.5em;
}

.modal-body {
	margin: 0;
}

.modal-body input {
	margin-body: 20px;
	height: 30px;
}

.modal-footer {
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
}

.modal-footer {
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
}

.modal-default-button {
	float: right;
}

/* 
	* The following styles are auto-applied to elements with
	* transition="modal" when their visibility is toggled
	* by Vue.js.
	*
	* You can easily play with the modal transition by editing
	* these styles.
*/
.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
