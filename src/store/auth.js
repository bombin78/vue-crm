import firebse from 'firebase/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {

      try {
        await firebse.auth().signInWithEmailAndPassword(email, password);
      } catch (e){
        console.log('dispatch', dispatch);
        console.log('commit', commit);
        throw e;
      }
    }
  }
}
