const getPremiumFeature = (req, res) => {
    res.json({ feature: 'This is a premium feature.' });
  };
  
  module.exports = { getPremiumFeature };
  