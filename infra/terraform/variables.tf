variable "subscription_id" { type = string }
variable "environment" { type = string }
variable "location" {
  type    = string
  default = "West Europe"
}
variable "app_name" {
  type    = string
  default = "aboutme"
}
