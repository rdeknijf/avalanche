+++
title = "Limit your BigQuery costs with Terraform"
date = 2021-10-06
description = "BigQuery query costs can explode beyond acceptable limits. Add this resources to any Google Cloud project you manage with Terraform."
draft = false
+++

Let's say you are a happy BigQuery user, and you spend about 100 euro a month on it. This may be
fine for your (small) business but an expensive query is quick to make. But what is expensive?
Because really; it's hard to create one that costs more than 30 euro. But what if someone
accidentally deploys something that fires off a 1 euro query every second. That means a 2.6
million (!) BQ bill; if you don't notice for a few days you'll find yourself begging Google for a
refund of hundreds of thousands of euros.

So, be safe and set up a Google Project module and use it for every project you set up and add some
quotas.
(I'd advise against actually adding the actual `google_project` resource to Terraform however,
because a `terraform destroy` will probably kill more than you'd like, and it will definitely create
a lot of ghost resources in a mangled `tfstate`. But that's another matter.)

And the first of those quotas should be the following:

```hcl
resource "google_service_usage_consumer_quota_override" "bigquery-query-tb-per-day" {
  provider       = google-beta
  project        = "<your project>"
  service        = "bigquery.googleapis.com"
  # double url-encoding, don't ask.
  metric         = urlencode(urlencode("bigquery.googleapis.com/quota/query/usage"))
  limit          = urlencode(urlencode("/d/project"))
  override_value = "100"  # 100 TiB per day, = about 600 euro max
  force          = true
}
```

I really am one such happy BigQuery user by the way. I think it is an amazing tool that can be
drastically faster and cheaper than any self-managed solution, especially in the long run. But it
has the potential to bankrupt you in mere days. So build in a safety net.

For those who doubt the reality of this scenario: it happened to me, and from what I hear it's not
even that rare.