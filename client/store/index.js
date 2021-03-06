import vuex from 'vuex';

const createStore = () => {
	return new vuex.Store({
		state: () => ({
			meetingRoom: {},
			meetingRooms: [],
			reservationDate: new Date().toISOString().split('T')[0],
			slots: [],
			token: null,
			user: {
				name: '',
				role: ''
			}
		}),
		mutations: {
			setMeetingRoom(state, room) {
				state.meetingRoom = room;
			},
			setMeetingRooms(state, rooms) {
				state.meetingRooms = rooms;
			},
			setReservationDate(state, date) {
				state.reservationDate = date;
			},
			setSlots(state, slots) {
				state.slots = slots;
			},
			setToken(state, token) {
				state.token = token;
			},
			clearToken(state) {
				state.token = null;
			},
			setUser(state, user) {
				state.user = user;
			},
			clearStore(state) {
				state.meetingRoom = {};
				state.meetingRooms = [],
				state.reservationDate = new Date().toISOString().split('T')[0],
				state.slots = [],
				state.token = null,
				state.user = {
					name: '',
					role: ''
				}
			}
		},
		actions: {
			addSlot(vuexContext, slot) {
				vuexContext.commit('setSlots', this.slots.concat(slot));
			},
			setMeetingRoom(vuexContext, room) {
				vuexContext.commit('setMeetingRoom', room);
				vuexContext.dispatch('setSlots', room.name);
			},
			setReservationDate(vuexContext, date) {
				vuexContext.commit('setReservationDate', date);
			},
			async setSlots(vuexContext, name) {
				const slots = await this.$axios.$get(
					'slotsMeetingRooms',
					{
						params: { name },
						headers: { "Authorization": vuexContext.getters.token }
					})
					.then(res => {
						const slotsMeetingRooms = [];
						if (res.slots) {
							return [];
						}
						for (const key in res) {
							slotsMeetingRooms.push({ ...res[key], id: parseInt(key) });
						}
						return slotsMeetingRooms;
					})
					.catch(() => [])
				vuexContext.commit('setSlots', slots);
			},
			async setMeetingRooms(vuexContext) {
				const meetingRooms = await this.$axios.$get('meetingRooms')
					.then(res => {
						const meetingRooms = [];
						for (const key in res.rooms) {
							meetingRooms.push({ ...res.rooms[key], id: parseInt(key) });
						}
						return meetingRooms;
					})
				vuexContext.commit('setMeetingRooms', meetingRooms);
				vuexContext.commit('setMeetingRoom', meetingRooms[0]);
			},
			async authenticateUser(vuexContext, authData) {
				return this.$axios.$get('login', { params: { pseudo: authData.pseudo, password: authData.password } })
				.then(result => {
					vuexContext.commit('setToken', result.token);
					localStorage.setItem('token', result.token);
					localStorage.setItem('tokenExpiration', new Date().getTime() + result.expiresIn * 1000);
					this.$cookies.set('jwt', result.token, { secure: true});
					this.$cookies.set('expirationDate', new Date().getTime() + result.expiresIn * 1000, { secure: true});
				})
			},
			async signupUser(vuexContext, authData) {
				const data = Object.keys(authData)
					.map((key, index) => key + '=' + encodeURIComponent(authData[key]))
					.join('&');
				return this.$axios.$post(
					'signup', 
					data,
					{
						headers: {
							"Content-Type": 'application/x-www-form-urlencoded'
						}
					})
				.then(result => {
					vuexContext.commit('setToken', result.token);
					localStorage.setItem('token', result.token);
					localStorage.setItem('tokenExpiration', new Date().getTime() + result.expiresIn * 1000);
					this.$cookies.set('jwt', result.token, { secure: true});
					this.$cookies.set('expirationDate', new Date().getTime() + result.expiresIn * 1000, { secure: true});
				})
			},
			initAuth(vuexContext, req) {
				let token;
				let expirationDate;
				if (req) {
					if (!req.headers.cookie) {
						return ;
					}
					const jwtCookie = req.headers.cookie
						.split(';')
						.find(c => c.trim().startsWith('jwt='));
					if (!jwtCookie) {
						return ;
					}
					token = jwtCookie.split('=')[1];
					expirationDate = req.headers.cookie
						.split(';')
						.find(c => c.trim().startsWith('expirationDate='))
						.split('=')[1];
				} else {
					token = localStorage.getItem('token');
					expirationDate = localStorage.getItem('tokenExpiration');
				}
				if (new Date().getTime() > +expirationDate || !token) {
					vuexContext.dispatch('logout');
					return ;
				}
				this.$axios.setToken(token);
				vuexContext.commit('setToken', token);
				vuexContext.dispatch('setUser');
			},
			logout(vuexContext) {
				vuexContext.commit('clearToken');
				this.$cookies.remove('jwt', { secure: true});
				this.$cookies.remove('expirationDate', { secure: true});
				if (process.client) {
					localStorage.removeItem('token');
					localStorage.removeItem('tokenExpiration');
				}
			},
			async setUser(vuexContext) {
				await this.$axios.$get(
					'user',
					{
						headers: { "Authorization": vuexContext.getters.token }
					}
				).then((user) => vuexContext.commit('setUser', user))
			},
			clearStore(vuexContext) {
				vuexContext.commit('clearStore');
				vuexContext.dispatch('logout');
			}
		},
		getters: {
			meetingRoom(state) {
				return state.meetingRoom;
			},
			meetingRooms(state) {
				return state.meetingRooms;
			},
			reservationDate(state) {
				return state.reservationDate;
			},
			slots(state) {
				return state.slots;
			},
			isAuthenticated(state) {
				return state.token != null;
			},
			token(state) {
				return state.token;
			},
			user(state) {
				return state.user;
			}
		}
	})
}

export default createStore;