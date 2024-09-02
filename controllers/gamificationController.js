const users = {}; // This should be replaced with a real database

const getUserPoints = (req, res) => {
  const userId = req.query.userId;
  const userPoints = users[userId] ? users[userId].points : 0;
  res.json({ points: userPoints });
};

const updateUserPoints = (req, res) => {
  const { userId, points } = req.body;
  if (!users[userId]) {
    users[userId] = { points: 0 };
  }
  users[userId].points += points;
  res.json({ points: users[userId].points });
};

module.exports = { getUserPoints, updateUserPoints };
