/**
 * Created by jeffreylaw on 12/16/15.
 */
export default socket => store => next => action => {
  //console.log('in middleware', action);
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
};

