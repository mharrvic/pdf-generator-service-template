resource "google_cloud_run_service" "pdf_service" {
  provider = google-beta
  name     = "pdf-service"
  location = var.region
  project  = var.project

  template {
    spec {
      containers {
        image = "${artifact_registry_url}/${var.project}/${artifact_repo}/${artifact_repo}:dev"
        env {
          name  = "GCS_BUCKET"
          value = var.gcs_bucket
        }
      }


      service_account_name = var.pdf_service_account_email
    }

    metadata {
      annotations = {
        "run.googleapis.com/client-name"   = "terraform"
        "autoscaling.knative.dev/maxScale" = "1000"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }


  autogenerate_revision_name = true
}

