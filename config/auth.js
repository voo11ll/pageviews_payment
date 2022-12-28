module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Пожалуйста, войдите в систему, чтобы просмотреть эту ссылку');
      res.redirect('/');
    }
    
  };