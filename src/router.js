import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import MyStories from './views/MyStories.vue'
import Login from './views/Login.vue'
import Story from './views/Story.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/mystories',
			name: 'mystories',
			component: MyStories,
		},
		{
			path: '/register',
			name: 'register',
			component: Register
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/story',
			name: 'story',
			component: Story,
		},
		{
			path: '/story/:id',
			name: 'story',
			component: Story,
			props: true,
		},
	]
})
