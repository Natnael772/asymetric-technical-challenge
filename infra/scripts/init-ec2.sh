#!/bin/bash
set -e

# Update system
sudo yum update -y

# Install dependencies
sudo yum install -y unzip git

# Install Docker
sudo yum install -y docker

# Start and Enable Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add current user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
# Note: Amazon Linux 2/2023 repositories might not have the latest docker-compose-plugin
# So we install the standalone binary for reliability.
DOCKER_COMPOSE_VERSION="v2.29.1"
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker Compose installation
docker-compose --version

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install --update

# Clean up
rm awscliv2.zip
rm -rf aws

echo "EC2 Initialization Complete. Please logout and login again for group changes to take effect."
