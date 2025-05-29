resource "aws_api_gateway_rest_api" "mobile_api" {
  name = "mobile-api"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Create separate resources for each endpoint
resource "aws_api_gateway_resource" "register" {
  rest_api_id = aws_api_gateway_rest_api.mobile_api.id
  parent_id   = aws_api_gateway_rest_api.mobile_api.root_resource_id
  path_part   = "register"
}

resource "aws_api_gateway_resource" "login" {
  rest_api_id = aws_api_gateway_rest_api.mobile_api.id
  parent_id   = aws_api_gateway_rest_api.mobile_api.root_resource_id
  path_part   = "login"
}

resource "aws_api_gateway_resource" "unregister" {
  rest_api_id = aws_api_gateway_rest_api.mobile_api.id
  parent_id   = aws_api_gateway_rest_api.mobile_api.root_resource_id
  path_part   = "unregister"
}

locals {
  endpoints = {
    register   = { lambda = aws_lambda_function.register, method = "POST", resource = aws_api_gateway_resource.register }
    login      = { lambda = aws_lambda_function.login, method = "POST", resource = aws_api_gateway_resource.login }
    unregister = { lambda = aws_lambda_function.unregister, method = "POST", resource = aws_api_gateway_resource.unregister }
  }
}

# Helper to create methods and integrations
resource "aws_api_gateway_method" "methods" {
  for_each = local.endpoints

  rest_api_id   = aws_api_gateway_rest_api.mobile_api.id
  resource_id   = each.value.resource.id
  http_method   = each.value.method
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integrations" {
  for_each = local.endpoints

  rest_api_id             = aws_api_gateway_rest_api.mobile_api.id
  resource_id             = each.value.resource.id
  http_method             = aws_api_gateway_method.methods[each.key].http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = each.value.lambda.invoke_arn
}

resource "aws_lambda_permission" "api_gw_permissions" {
  for_each = local.endpoints

  statement_id  = "AllowAPIGatewayInvoke${each.key}"
  action        = "lambda:InvokeFunction"
  function_name = each.value.lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.mobile_api.execution_arn}/*/*"
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [aws_api_gateway_integration.integrations]
  rest_api_id = aws_api_gateway_rest_api.mobile_api.id
}

resource "aws_api_gateway_stage" "prod" {
  deployment_id = aws_api_gateway_deployment.deployment.id
  rest_api_id   = aws_api_gateway_rest_api.mobile_api.id
  stage_name    = "prod"
}
