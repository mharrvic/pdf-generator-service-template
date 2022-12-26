provider "google" {
  project = local.project
}

locals {
  project               = "your-gcloud-project-id"
  region                = "us-central1"
  zone                  = "us-central1-a"
  artifact_registry_url = "us-central1-docker.pkg.dev"
  artifact_repo         = "pdf-service"
  gcs_bucket            = "any-gcs-bucket-name"
}

module "service_account" {
  source = "../../modules/service-account"

  project = local.project
  region  = local.region
}

module "cloudrun" {
  source = "../../modules/cloudrun"

  project                   = local.project
  region                    = local.region
  pdf_service_account_email = module.service_account.pdf_service_account_email
  artifact_registry_url     = var.artifact_registry_url
  artifact_repo             = var.artifact_repo
  gcs_bucket                = var.gcs_bucket
}
