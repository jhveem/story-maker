import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
	},
	actions: {
		//users, logging in and out, passwords
		async register(context, data) {
			try {
				let response = await axios.post("/api/users", data);
				context.commit('setUser', response.data);
				return "";
			} catch (error) {
				return error.response.data.message;
			}
		},
		async login(context, data) {
			try {
				let response = await axios.post("/api/users/login", data);
				context.commit('setUser', response.data);
				return "";
			} catch (error) {
				return error.response.data.message;
			}
		},
		async logout(context) {
			try {
				await axios.delete("/api/users");
				context.commit('setUser', null);
				return "";
			} catch(error) {
				return error.response.data.message;
			}
		},
		async getUser(context) {
			try {
				let response = await axios.get("/api/users");
				context.commit('setUser', response.data);
				return "";
			} catch (error) {
				return "";
			}
		},

		//story stuff
		async getStory(context, data) {
			try {
				let response = await axios.get('/api/story/'+data.id);
				return response.data;
			} catch(error) {
				return '';
			}
		},
		async getStories(context, data) {
			try {
				let response = await axios.get('/api/story/all');
				return response.data;
			} catch(error) {
				return '';
			}
		},
		async updateStory(context, data) {
			try {
				let response = await axios.put('/api/story', data);
				return '';
			} catch (error) {
				return '';
			}
		},
		async saveStory(context, data) {
			try {
				let response = await axios.post('/api/story', data);
				return response.data._id;
			} catch (error) {
				return '';
			}
		},
		async addPath(context, data) {
			try {
				let response = await axios.put('/api/story/path', data);
				return response.data.paths;
			} catch (error) {
				return '';
			}
		},
		async removePath(context, data) {
			try {
				let response = await axios.delete('/api/story/path', {data: data});
				console.log(response);
				console.log('hi');
				return response.data.paths;
			} catch (error) {
				return '';
			}
		},
	}
})
