const users = {
    'user1': { isPremium: true },
    'user2': { isPremium: false },
  }; // Replace with real database
  
  const checkSubscription = (req, res, next) => {
    const userId = req.query.userId;
    if (users[userId] && users[userId].isPremium) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied. Upgrade to premium to access this feature.' });
    }
  };
  
  module.exports = checkSubscription;
  