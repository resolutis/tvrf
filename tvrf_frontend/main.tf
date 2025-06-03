provider "aws" {
  region = "eu-west-2" # Change to your desired region
}

resource "aws_amplify_app" "frontend" {
  name         = "tvrf-frontend"
  repository   = "https://github.com/yourusername/tvrf-frontend.git" # Replace with your actual repository URL
  access_token = "your-github-access-token"                          # Replace with your GitHub access token
  build_spec   = <<-EOT
    version: 1
    frontend:
      phases:
        build:
          commands:
            - npm install
            - npm run build
      artifacts:
        baseDirectory: build
        files:
          - '**/*'
  EOT
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.frontend.id
  branch_name = "main"
  framework   = "React"
  stage       = "PRODUCTION"
}
