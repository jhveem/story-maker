<template>
	<div>
		<div v-if="user">
			<div class="story">
				<form @submit.prevent="saveStory">
					<div class="field-head">Title</div>
					<input ref='title' v-model="title" class="story-title" type="text" name="title"><br><br>
					<div class="field-head">Text</div>
					<textarea v-model="text" class="story-text" type="text" name="text"></textarea><br>
					<button class="pure-button-primary" type="submit">save</button><br>
					<br>
					<div v-if="id !== ''">
						<div v-if="paths.length > 0"> 
							<div class="field-head">Paths</div>
							<br>
							<span v-for="path in paths"> <a class="story-link" :href="path._id">{{path.title}} </a> <button class="pure-button-primary"@click="deletePath(path)">x</button> | </span>
							<br><br>
						</div>
						<select style="margin: 10px" ref='paths' @change="changeSelectedPath">
							<option v-for="s in stories" :value="s._id">{{s.title}}</option>
						</select>
						<button class="pure-button-primary" @click="addPath($refs.paths)">Add Path</button>
						<br>
					</div>
				</form>
			</div>
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
		name: 'story',
		components: {
		},
		data() {
			return {
				focus: 'title',
				show: false,
				title: '',
				text: '',
				story: {},
				stories: [],
				paths: [],
				toggleText: false,
				error: '',
			}
		},
		computed: {
			user() {
				return this.$store.state.user;
			},
			editTitle() {
				return this.focus === 'title';
			},
			id() {
				if (typeof(this.$route.params.id) === 'undefined') {
					return '';
				} else {
					return this.$route.params.id;
				}
			},
		},
		async created() {
			//await this.$store.dispatch("getUser");
			if (this.id !== '') {
				let data = {
					id: this.id,
				}
				this.story = await this.$store.dispatch('getStory', data);
				this.title = this.story.title;
				this.text = this.story.text;
				this.paths = this.story.paths;
			}
			this.stories = await this.$store.dispatch('getStories');
		},
		methods: {
			changeSelectedPath(e) {
				console.log(e.target.options[e.target.options.selectedIndex].value);
			},
			async saveStory() {
				try {
					let data = {
						id: this.id,
						title: this.title,
						text: this.text,
					};
					if (this.id === '') {
						let id = await this.$store.dispatch('saveStory', data);
						this.$router.push('story/'+id);
					} else {
						await this.$store.dispatch('updateStory', data);
					}
				} catch(error) {
					console.log(error);
				}
			},
			async deleteStory() {

			},
			async addPath(paths) {
				let id = paths.options[paths.options.selectedIndex].value;
				let data = {
					id: this.id,
					path: id,
				};
				let res = await this.$store.dispatch('addPath', data);
				if (typeof(res) !== 'undefined') {
					this.paths = res;
				}
			},
			async newPath() {
			},
			async deletePath(path) {
				let data = {
					id: this.id,
					path: path._id,
				}
				let res = await this.$store.dispatch('removePath', data);
				if (typeof(res) !== 'undefined') {
					this.paths = res;
				}
			},
		},
	}
</script>

<style scoped>
	.story-link {
		text-decoration: none;
	}
	.story-title {
		width: 500px;

	}
	.story-text {
		width: 500px;
		height: 250px;
	}
	.field-head {
		width: 500px;
		height: 30px;
		background: #396;
		color: #FFF;
		text-align: center;
		padding: 5px;
		font-weight: bold;
		font-size: 20px;
	}
</style>
