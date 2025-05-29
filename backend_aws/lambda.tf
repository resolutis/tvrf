data "archive_file" "login_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/login"
  output_path = "${path.module}/login.zip"
}

resource "aws_lambda_function" "login" {
  function_name = "login"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = data.archive_file.login_lambda_zip.output_path
}

# Repeat for register and unregister
data "archive_file" "register_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/register"
  output_path = "${path.module}/register.zip"
}

resource "aws_lambda_function" "register" {
  function_name = "register"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = data.archive_file.register_lambda_zip.output_path
}

data "archive_file" "unregister_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/unregister"
  output_path = "${path.module}/unregister.zip"
}

resource "aws_lambda_function" "unregister" {
  function_name = "unregister"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = data.archive_file.unregister_lambda_zip.output_path
}
