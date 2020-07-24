
function authUser() {
  return async(req, res, next) => {
    try{
      if(!req.session || !req.session.user) {
        res.status(401).json({msg: "You FOOL! You're not logged in!"})
      }
      next()
    }
    catch(err) {next(err)}
  }
}

module.exports = authUser