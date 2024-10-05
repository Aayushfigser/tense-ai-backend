import numpy as np
import sys
import json

class UserEnvironment:
    def __init__(self):
        self.state = self.reset()
        self.action_space = ['recommend_goal', 'provide_feedback', 'ask_for_input', 'recommend_insights']

    def reset(self):
        # Reset the environment
        self.state = {'past_experience': None, 'current_goal': None, 'future_ambition': None}
        return self.state

    def step(self, action):
        if action == 'recommend_goal':
            self.state['current_goal'] = 'New Goal'
            reward = 1
        elif action == 'provide_feedback':
            reward = 0.5
        elif action == 'ask_for_input':
            reward = -0.5
        else:
            reward = -1
        
        return self.state, reward, False

if __name__ == "__main__":
    action = sys.argv[1]  # Get action from argument

    env = UserEnvironment()

    state, reward, done = env.step(action)

    print(json.dumps({"state": state, "reward": reward, "done": done}))



#This Python script simulates the environment where the RL agent interacts. The environment is updated based on actions taken by the RL agent,
#and it returns the next state and reward. 
