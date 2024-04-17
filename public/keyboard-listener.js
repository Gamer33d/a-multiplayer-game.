export function createKeyboardListener(document){
    const state = {
       observer: [],
       playerId: null
    }

    function subscribeObserver(observerFunction){
      state.observer.push(observerFunction)
    }

    function unsubscribeAllObservers(){
      state.observer = []
    }

    function notifyAll(command){
      for (const observerFunction of state.observer) {
        observerFunction(command)
      }
    }

    document.addEventListener('keydown', handleKeydown)
    function handleKeydown(event){
      const keyPressed = event.key
      
      const command = {
        type: "move-player",
        playerId: state.playerId,
        keyPressed
      }

      notifyAll(command)
    }


    function registerPlayerId(playerId){
      state.playerId = playerId
    }

    return {
      subscribeObserver,
      registerPlayerId,
      unsubscribeAllObservers
    } 
}