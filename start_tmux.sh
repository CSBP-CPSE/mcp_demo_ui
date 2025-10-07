#! /bin/bash

# Start a new tmux session named "dev"
tmux new-session -d -s dev

# Rename the first window
tmux rename-window -t dev:0 "backend"

# Create a new window for the frontend
tmux new-window -t dev:1 -n "frontend"

# Create a tird window for other purposes
tmux new-window -t dev:2 -n "other"

# Set up the environment
tmux send-keys -t dev:0 "cd src/ && source .venv/bin/activate && uvicorn api.main:create_app --factory --reload --host 0.0.0.0 --port 8000" C-m
tmux send-keys -t dev:1 "cd src/ && source .venv/bin/activate && cd frontend/ &&npm run dev -- --host 0.0.0.0 --port 3000" C-m

# Select window 1 and attach to the session
tmux select-window -t dev:2
tmux attach-session -t dev
