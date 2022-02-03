+++ 
title = "I made an online Github Actions upgrader!"
date = 2022-01-31
description = "My first Javascript in at least 10 years"
draft = false
+++

TL;DR: [gaup.deknijf.com](https://gaup.deknijf.com)

Github Actions is absolutely great. It's fast, clean, clear, and I've yet to encounter a task I 
can't accomplish. The main advantage of Github Actions over something like BitBucket Pipelines is 
the sheer number of modules (called "actions") that you can just use.

Need a docker image built?

```yaml
  - name: Set up Docker Buildx
    uses: docker/setup-buildx-action@v1.6.0
  - name: Login to GCR
    uses: docker/login-action@v1.12.0
    with:
      registry: eu.gcr.io
      username: _json_key
      password: ${{ secrets.GOOGLE_SA_KEY }}
  - name: Build and push run image
    uses: docker/build-push-action@v2.8.0
    with:
      push: true
      tags: |
        eu.gcr.io/kieskeurig-data-analyse/legaport2/run:${{ github.run_number }}
        eu.gcr.io/kieskeurig-data-analyse/legaport2/run:latest
      cache-from: eu.gcr.io/kieskeurig-data-analyse/legaport2/run:latest
      cache-to: type=inline
      target: run
```
Need some Terraform deployed?

```yaml
  - name: Setup Terraform
    uses: hashicorp/setup-terraform@v1.3.2
  - name: Terraform init
    working-directory: terraform
    run: terraform init -input=false
  - name: Terraform apply
    working-directory: terraform
    run: terraform apply -auto-approve -input=false
```
However, you see those version tags? They get out of date. And it's a pain to go to every
Marketplace link to figure out what the latest version is. (Spoiler: it's not always `latest`)

So I scratched an itch. I wanted something where I could just paste in the GA workflow code and get
it back with updated versions. I built it in Javascript, because it's just logical. It's my first JS
in at least 10 years, but I had some very insightful help from a frontend colleague. I started out
interpreting the yaml, but that's really just dumb. It starts to complain about errors, and I just
don't care about that in this stage. I know I've copy-pasted some gibberish, that's okey, I'm not
done with it yet!
Now it just regexes the content and replaces any version tag it finds with the latest. Which it
pulls asynchronously from the Github API.

Now I (and some colleagues of mine) use it multiple times a week at least. All joking aside I'm 
pretty sure it must have saved me hours already, and a whole lot of frustration.
So, spare yourself some grinding, for free!

Check it out: [gaup.deknijf.com](https://gaup.deknijf.com)