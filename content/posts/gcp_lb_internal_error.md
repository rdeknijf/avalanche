+++ 
title = "`internal_error` in Google Cloud HTTP(S) Load Balancing logs"
date = 2021-12-11
description = "Google HTTP loadbalancers are great. But this very undescriptive error threw me a curveball."
draft = false 
+++

I'd set up a Google App Engine service which was working fine, but I routed traffic to it via an
HTTP loadbalancer. Which was working great in `acceptance` but not so much in `production`. It just
threw a `404: Not Found` at me. Nothing else. I checked the service logs, but traffic didn't seem to
arrive at the GEA service. So what now? I enabled the load balancer logs which delivered this gem:

```json
{
  "jsonPayload": {
    "statusDetails": "internal_error",
    "@type": "type.googleapis.com/google.cloud.loadbalancing.type.LoadBalancerLogEntry"
  },
  "httpRequest": {
    ...
  },
  "resource": {
    "type": "http_load_balancer",
    "labels": {
      ...
    }
  },
  ...
  "severity": "WARNING",
  ...
}
```

What?! Internal error. Internal to what? So I
checked [the docs](https://cloud.google.com/load-balancing/docs/https/https-logging-monitoring#statusdetail_http_failure_messages):

```txt
Internal error at the load balancer. 
Normally represents a transient error in the load balancer infrastructure. 
Retry your query. 
```

Basically, its saying that there's something wrong on the Google side.

Well, let me save you some time: There isn't.

First I did what it said. I retried. And having some experience with cloud load balancers I duly
waited for the magic of "time" to do its thing. But no sigar. So, since everything is in Terraform
anyway I nuked the whole thing. (Including the GEA service, mostly out of spite by now.) And I had
Terraform rebuild everything and waited some more.

Again, `internal_error`... Damn.

Then I went for a run and in the first 500 meters I had three brilliant ideas. (Note to self: run
when stuck.)
The first of which was checking the GEA service it was trying to connect to.

(I didn't before because the LB considered it "healthy". But that's just because Serverless NEG's 
*don't have healthchecks*. You could send it all to `/dev/null`, and it would still claim all was
fine and dandy. But I digress.)

And lo-and-behold the NEG was trying to connect with `frontend-prod`, which is of course not the
same as `frontend-prd` and therefore didn't exist at all. With `prd` being the superior acronym (
since it's the same length as `acc`, `tst` and `dev`) I changed this in the one place it was
called `prod` which caused Terraform to nuke almost everything again (that should teach it). And then
I had the wonderful experience of doing some actual coding for a bit while Google dealt with certs
and all that. (To think that we once did all this by hand...)
And when I returned after ten minutes I was greeted by a purring LB-GEA connection.

Moral of this story: check your spelling when a GCP LB tells you it's borked internally.
