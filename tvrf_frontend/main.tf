provider "aws" {
  region = "eu-west-2" # Change to your desired region
}

locals {
  github_access_token = regex("GITHUB_ACCESS_TOKEN=(.*)", file("${path.module}/../.env"))[0]
}

variable "api_url" {
  description = "The API Gateway URL"
  type        = string
  default     = "https://94x2bbtt7d.execute-api.eu-west-2.amazonaws.com/prod"
}

resource "aws_amplify_app" "frontend" {
  name         = "tvrf-frontend"
  repository   = "https://github.com/resolutis/tvrf.git"
  access_token = local.github_access_token
  build_spec   = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - nvm install 20
            - nvm use 20
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  environment_variables = {
    VITE_API_URL = var.api_url
    NODE_OPTIONS = "--max-old-space-size=4096"
  }

  enable_branch_auto_build    = true
  enable_branch_auto_deletion = true
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.frontend.id
  branch_name = "main"
  framework   = "React"
  stage       = "PRODUCTION"
}
