import vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

const createStore = () => {
	return new vuex.Store({
		state: () => ({
			meetingRoom: {},
			meetingRooms: [],
			reservationDate: new Date().toISOString().split('T')[0],
			slots: [],
			token: null,
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
			}
		},
		actions: {
			async nuxtServerInit({ commit }) {
				const meetingRooms = await axios.get(process.env.API_URL + 'meetingRooms')
					.then(res => {
						const meetingRooms = [];
						for (const key in res.data.rooms) {
							meetingRooms.push({ ...res.data.rooms[key], id: parseInt(key) });
						}
						return meetingRooms;
					})
				commit('setMeetingRooms', meetingRooms);
				commit('setMeetingRoom', meetingRooms[0]);
				const slots = await axios.get(process.env.API_URL + 'slotsMeetingRooms', { params: { name: meetingRooms[0].name } })
					.then(res => {
						const slotsMeetingRooms = [];
						if (res.data.slots) {
							return [];
						}
						for (const key in res.data) {
							slotsMeetingRooms.push({ ...res.data[key], id: parseInt(key) });
						}
						return slotsMeetingRooms;
					})
				commit('setSlots', slots);
			},
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
				const slots = await axios.get(process.env.API_URL + 'slotsMeetingRooms', { params: { name } })
					.then(res => {
						const slotsMeetingRooms = [];
						if (res.data.slots) {
							return [];
						}
						for (const key in res.data) {
							slotsMeetingRooms.push({ ...res.data[key], id: parseInt(key) });
						}
						return slotsMeetingRooms;
					})
				vuexContext.commit('setSlots', slots);
			},
			authenticateUser(vuexContext, authData) {
				var url = process.env.API_URL + 'login'
				return axios.get(url, { params: { pseudo: authData.pseudo, password: authData.password } })
				.then(result => {
					vuexContext.commit('setToken', result.data.token);
					localStorage.setItem('token', result.data.token);
					localStorage.setItem('tokenExpiration', new Date().getTime() + result.data.expiresIn * 1000);
					Cookie.set('jwt', result.data.token);
					Cookie.set('expirationDate', new Date().getTime() + result.data.expiresIn * 1000);
				})
				.catch(e => console.log(e));
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
				vuexContext.commit('setToken', token);
			},
			logout(vuexContext) {
				vuexContext.commit('clearToken');
				Cookie.remove('token');
				Cookie.remove('expirationDate');
				if (process.client) {
					localStorage.removeItem('token');
					localStorage.removeItem('tokenExpiration');
				}
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
			}
		}
	})
}

export default createStore;