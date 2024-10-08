import numpy as np
import random
import sys
import json

class RLAgent:
    def __init__(self, action_space):
        self.q_table = np.zeros((10, len(action_space)))  # Initialize Q-table
        self.action_space = action_space
        self.learning_rate = 0.1
        self.discount_factor = 0.9
        self.exploration_rate = 1.0

    def select_action(self, state):
        if random.uniform(0, 1) < self.exploration_rate:
            return random.choice(self.action_space)  # Explore
        else:
            return self.action_space[np.argmax(self.q_table[state])]  # Exploit

    def learn(self, state, action, reward, next_state):
        action_index = self.action_space.index(action)
        self.q_table[state, action_index] += self.learning_rate * (
            reward + self.discount_factor * np.max(self.q_table[next_state]) - self.q_table[state, action_index]
        )

if __name__ == "__main__":
    state = json.loads(sys.argv[1])  # Get state from argument
    action = sys.argv[2]  # Get action from argument

    # Instantiate RL agent
    action_space = ['recommend_goal', 'provide_feedback', 'ask_for_input', 'recommend_insights']
    agent = RLAgent(action_space)

    # Simulate action selection
    next_state = agent.select_action(state)
    
    # Provide a mock output based on the selected action
    mock_output = {
        "recommend_goal": 5,  # Example score for each action
        "provide_feedback": 3,
        "ask_for_input": 2,
        "recommend_insights": 4
    }

    # Fetch output based on selected action
    rl_action_output = mock_output.get(next_state, 0)  # Default to 0 if action not found

    # Create output structure
    rl_output = {
        'qTable': agent.q_table.tolist(),  # Convert numpy array to list for JSON serialization
        'state': next_state,
        'output': rl_action_output  # Mock output for testing
    }

    print(json.dumps(rl_output))
