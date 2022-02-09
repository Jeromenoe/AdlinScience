import vuex from 'vuex';

const createStore = () => {
	return new vuex.Store({
		state: {
			meetingRoom: "default"
		},
		mutations: {
			setMeetingRoom(state, room) {
				state.meetingRoom = room;
			}
		},
		actions: {
			// nuxtServerInit(vuexContext, context) {
				
			// },
			setMeetingRoom(vuexContext, room) {
				vuexContext.commit('setMeetingRoom', room);
			}
		},
		getters: {
			meetingRoom(state) {
				return state.meetingRoom;
			}
		}
	})
}

export default createStore;