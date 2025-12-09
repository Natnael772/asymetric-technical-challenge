#!/bin/bash
set -e

# Load environment variables if present in .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Check required variables
if [ -z "$AWS_REGION" ] || [ -z "$AWS_ACCOUNT_ID" ]; then
    echo "Error: AWS_REGION and AWS_ACCOUNT_ID must be set."
    exit 1
fi

echo "Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

echo "Pulling latest images..."
docker-compose -f infra/docker-compose.yml pull

echo "Restarting services..."
docker-compose -f infra/docker-compose.yml up -d

echo "Deployment successful!"
