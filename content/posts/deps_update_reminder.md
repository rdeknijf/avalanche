+++ title = "CICD trick to keep your dependencies up to date"
date = 2022-01-09
description = ""
draft = false
+++

Most developers know they should pin their 3rd party dependencies. I usually write Python, but this
goes for any language. You don't want to send your commit into CICD and have it be deployed with
packages that are different from what you've tested it with locally.

On the other hand, every day you lag behind with updating those dependencies you're making doing
that very thing in the future more dangerous. Up to the point that it becomes a "project" in itself,
or even until it's just frozen in place because nobody will touch it.

So, how to find a balance?


> Side note: I'm aware of Dependabot, and I should probably dive into it more. But let's say my experience hasn't been all positive, as of yet. And what if that's not an option? (I wouldn't know when, but hey.)

### The brilliant idea: Biweekly nagging

Add a step in your CICD that blocks if there are more than X packages out of date. Then, over time,
tweak that X until it's like every two weeks or so. Don't run this pipeline on `master`, you still want
to be able to hotfix things. But on `develop` or `feature/` make CICD force someone to deal with it. 
(Practically this meant running [`pip-upgrader` ](https://pypi.org/project/pip-upgrader/) which is
still not a big deal. Of course this is a bit of a nuisance, and I was informed of that fact quite a
few times by my teammates. But it did avoid a much bigger problem, and kept us free to use the
latest of everything.

We've since switched to `pipenv` for most projects, but the concept is basically the same. You unpin
everything possible in the `Pipfile` and making updating the `Pipfile.lock` that thing you don't
like doing every two weeks.

This system has a few rough edges. Firstly it only works on an active project. If CICD is not
running I'll never nag you. And then if you work on it sporadically, it'll nag you every time! Which
may not be your cup of tea. Also, X outdated packages is vague. This will vary wildly per project.
Perhaps it's better to make it Z percent outdated packages. You could also build something that just
forces you to do this every Y time.

But it has one big advantage: You can add it in 5 minutes.

Example commands:

```bash
$ pip list --outdated --not-required --local --exclude-editable --format=freeze | wc -l
$ npm outdated | wc -l
```

This gets you that number. And then you can use it like this in your Jenkinsfile for example:

```Jenkinsfile
script {

    def max_outdated_package_count = env.PIP_MAX_OUTDATED.toInteger()

    def outdated_package_count = sh (
            returnStdout: true,
            script: 'pip list --outdated --not-required --local --exclude-editable --format=freeze | wc -l'
    ).trim().toInteger()
    if (outdated_package_count >= max_outdated_package_count) {
        error "${outdated_package_count} Python packages in the requirements files have updates, which is more than ${max_outdated_package_count}"
    } else {
        echo "${outdated_package_count} Python packages in the requirements files have updates, which is less than ${max_outdated_package_count}"
    }
}
```

