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
            return random.choice(self.action_space)
        else:
            return self.action_space[np.argmax(self.q_table[state])]

    def learn(self, state, action, reward, next_state):
        action_index = self.action_space.index(action)
        self.q_table[state, action_index] += self.learning_rate * (
            reward + self.discount_factor * np.max(self.q_table[next_state]) - self.q_table[state, action_index]
        )

# Main program execution
if __name__ == "__main__":
    state = json.loads(sys.argv[1])  # Get state from argument
    action = sys.argv[2]  # Get action from argument

    # Instantiate RL agent and environment
    action_space = ['recommend_goal', 'provide_feedback', 'ask_for_input', 'recommend_insights']
    agent = RLAgent(action_space)

    # Simulate action selection
    next_state = agent.select_action(state)

    # Return the result
    rl_output = {
        'qTable': agent.q_table.tolist(),  # Convert numpy array to list for JSON serialization
        'state': next_state,
    }

    print(json.dumps(rl_output))
