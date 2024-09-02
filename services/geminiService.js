// services/geminiService.js

const analyzeExperience = (experience) => {
    return `Analysis of your experience: ${experience}`;
  };
  
  console.log('Exporting analyzeExperience:', analyzeExperience);
  
  module.exports = {
    analyzeExperience,
  };
  