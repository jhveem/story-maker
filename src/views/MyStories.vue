<template>
	<div>
		<div v-if="user">
			<div class="header">
					<span class='head'>{{user.name}} </span>
					<button class="pure-button-primary" @click="logout()">logout</button>
			</div>
			<br>
			<br>
			<div class="head">My Stories</div>
			<div v-for="s in stories"><router-link :to="'/story/'+s._id">{{s.title}}</router-link></div>
		</div>
		<div v-else>
			<p>If you would like to upload photos, please register for an account or login.</p>
			<router-link to="/register" class="pure-button">Register</router-link> or
			<router-link to="/login" class="pure-button">Login</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mypage',
	data() {
		return {
			show: false,
			stories: [],
		}
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
	},
	async created() {
		await this.$store.dispatch("getUser");
		this.stories = await this.$store.dispatch('getStories');
	},
	methods: {
		async logout() {
			try {
				this.error = await this.$store.dispatch("logout");
			} catch (error) {
				console.log(error);
			}
		},
		escape() {
			this.show = false;
		},
	},
}
</script>

<style scoped>
.pure-button {
	margin: 0px 20px;
}
.head{
	font-weight: bold;
	font-size: 20px;
}

.header a {
	padding-left: 50px;
	color: #222;
	font-size: 2em;
}

.header .button {
	margin-left: 50px;
	order: 2;
}
</style>
