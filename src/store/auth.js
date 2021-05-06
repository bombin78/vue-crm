import firebse from 'firebase/app'

export default {
  actions: {
    async login({commit}, {email, password}) {

      try {
        await firebse.auth().signInWithEmailAndPassword(email, password);
      } catch (e){
        commit('setError', e);
        throw e;
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebse.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebse.database().ref(`/users/${uid}/info`).set({
          bill: 100000,
          name,
        });
      } catch (e){
        commit('setError', e);
        throw e;
      }
    },
    getUid() {
      const user = firebse.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({commit}){
      await firebse.auth().signOut();
      commit('clearInfo');
    }
  }
}
