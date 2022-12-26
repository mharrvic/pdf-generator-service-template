resource "google_service_account" "pdf_service_account" {
  provider     = google-beta
  account_id   = "pdf-service-identity"
  project      = var.project
  display_name = "PDF Service Identity"
}


resource "google_project_iam_member" "pdf_service_account" {
  project = var.project
  for_each = toset([
    "roles/storage.objectCreator",
    "roles/artifactregistry.writer",
    "roles/run.developer",
    "roles/iam.serviceAccountUser"
  ])
  role   = each.key
  member = "serviceAccount:${google_service_account.pdf_service_account.email}"
}


