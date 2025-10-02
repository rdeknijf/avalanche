# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Hugo-based personal website for deknijf.com, built with the PaperMod theme and deployed automatically to Cloudflare Pages. The site contains technical blog posts covering topics like Terraform, BigQuery, Kubernetes, and cloud infrastructure.

## Quick Start

```bash
# Initialize theme submodule
git submodule update --init --recursive

# Start development server with drafts
hugo server -D

# Build for production
HUGO_ENV=production hugo --gc --minify
```

## Prerequisites and Installation

### Required Tools
- **Hugo** (static site generator)
- **Git** (for theme submodule management)

### Installation Commands

On Arch-based systems (EndeavourOS), prefer paru or yay:
```bash
# Install Hugo
paru -S hugo
# or
yay -S hugo

# Install Git (if not already present)
paru -S git
```

Alternative package managers:
```bash
# On other Linux distributions
sudo apt install hugo git        # Ubuntu/Debian
sudo dnf install hugo git        # Fedora
brew install hugo git            # macOS
```

## Project Architecture

### Directory Structure
```
avalanche2/
├── config.yml           # Main Hugo configuration
├── content/             # Markdown content files
│   └── posts/          # Blog post content
├── static/             # Static assets (PDFs, images)
├── themes/             # Hugo themes
│   └── papermod/       # PaperMod theme (git submodule)
├── public/             # Generated site output (ignored by git)
└── resources/          # Hugo processing cache (ignored by git)
```

### Key Components
- **Content**: Blog posts written in Markdown with TOML front matter
- **Theme**: Uses the popular PaperMod theme via git submodule
- **Configuration**: Single `config.yml` file with site settings and theme parameters
- **Deployment**: Automatic deployment to Cloudflare Pages on git push

## Configuration Overview

Key configuration settings in `config.yml`:
- **Base URL**: `https://deknijf.com`
- **Theme**: `papermod` (via git submodule)
- **Output formats**: HTML, RSS, JSON
- **Features enabled**: Google Analytics, code copy buttons, breadcrumbs, reading time
- **Content settings**: Drafts enabled for development, emoji support

## Local Development

### Start Development Server
```bash
# Basic development server
hugo server

# Development server with drafts and future posts
hugo server -D -F

# Bind to all interfaces (useful for testing on other devices)
hugo server -D --bind 0.0.0.0

# Custom port
hugo server -D --port 1314
```

### Development URLs
- Local site: http://localhost:1313
- Live reload is enabled by default

### Common Development Flags
- `-D, --buildDrafts`: Include draft content
- `-F, --buildFuture`: Include content with future dates
- `--disableFastRender`: Disable fast render for full rebuilds
- `--navigateToChanged`: Navigate to changed content automatically

## Content Authoring Workflow

### Creating New Posts
```bash
# Create new post (creates file with front matter template)
hugo new posts/my-new-post.md

# Edit the post
$EDITOR content/posts/my-new-post.md
```

### Front Matter Format
Posts use TOML front matter format:
```toml
+++
title = "Post Title"
date = 2023-10-01
description = "Brief description for meta tags and RSS"
draft = false
+++
```

### Content Organization
- All blog posts go in `content/posts/`
- Static files (PDFs, images) go in `static/` directory
- Use descriptive filenames with hyphens for URLs

## Assets and Styling

### Theme Assets
- The PaperMod theme handles all styling and JavaScript
- Theme assets are managed via the git submodule
- No custom SCSS/CSS compilation required

### Static Assets
- Place static files in `static/` directory
- Files are served directly from the site root
- Example: `static/document.pdf` → `https://deknijf.com/document.pdf`

## Building for Production

### Production Build
```bash
# Clean previous build
rm -rf public/

# Build with production settings
HUGO_ENV=production hugo --gc --minify
```

### Build Output
- Generated site is output to `public/` directory
- `--gc` runs garbage collection on unused cache files
- `--minify` minifies HTML, CSS, and JavaScript

## Deployment

### Primary Method: Cloudflare Pages
The site automatically deploys to Cloudflare Pages when changes are pushed to the repository.

**Deployment details:**
- **Trigger**: Git push to main/master branch  
- **Build command**: `hugo --gc --minify`
- **Output directory**: `public`
- **URL**: https://deknijf.com

### Manual Deployment Testing
```bash
# Build the site
HUGO_ENV=production hugo --gc --minify

# Verify the build
ls -la public/
```

## Common Tasks

### Update Theme
```bash
# Update PaperMod theme submodule
git submodule update --remote themes/papermod

# Commit the update
git add themes/papermod
git commit -m "Update PaperMod theme"
```

### View Site Statistics  
```bash
# Show draft posts
hugo list drafts

# Show future posts
hugo list future

# Show all content
hugo list all
```

### Content Validation
```bash
# Check for broken internal links
hugo --gc --minify --printUnusedTemplates

# Serve production build locally
hugo server --environment production
```

## Troubleshooting and Tips

### Common Issues

**Theme not loading**: Ensure the submodule is initialized
```bash
git submodule update --init --recursive
```

**Hugo command not found**: Install Hugo using your package manager
```bash
paru -S hugo  # Arch-based systems
```

**Build fails**: Check Hugo version compatibility
```bash
hugo version
```

**Port already in use**: Specify a different port
```bash
hugo server -D --port 1314
```

**Deprecated config warnings**: If you see `paginate` deprecation warnings:
```bash
# The config has been updated to use pagination.pagerSize instead of paginate
# This should already be fixed in the current config.yml
```

**Google Analytics GA4 warnings**: GA4 is already configured with measurement ID G-F3KDCBQZY7

**Raw HTML warnings**: If you see warnings about raw HTML being omitted:
```yaml
# Add to config.yml to suppress warnings:
ignoreLogs:
  - 'warning-goldmark-raw-html'
```

### Performance Tips
- Use `hugo server --disableFastRender` if you encounter rendering issues
- Clear `resources/_gen/` if you have caching issues
- Use `hugo --gc` regularly to clean up unused cache files

## Upgrading and Maintenance

### Hugo Updates
```bash
# Update Hugo
paru -Syu hugo

# Check version
hugo version
```

### Theme Updates
```bash
# Check current theme version
cd themes/papermod
git log --oneline -5

# Update to latest
cd ../..
git submodule update --remote themes/papermod
git add themes/papermod
git commit -m "Update PaperMod theme to latest version"
```

### Content Maintenance
- Review and update outdated technical content regularly
- Check external links for validity
- Update copyright years in configuration
- Monitor Google Analytics for popular content

### Security Considerations
- Keep Hugo updated for security patches
- Review theme updates for security fixes
- Ensure no sensitive information is committed to the repository
- The site includes Google Analytics (UA-10690335-2) - ensure this complies with privacy policies

## Development Environment Notes

This documentation assumes:
- EndeavourOS (Arch-based Linux distribution)
- Preference for `paru` or `yay` package managers
- Zsh shell environment
- Git for version control

## Configuration Reference

### Key Config Values
- **Base URL**: `https://deknijf.com`
- **Title**: "De Knijf ICT" 
- **Author**: "Rutger de Knijf"
- **Theme**: PaperMod v8.0+ (latest)
- **Default theme**: Auto (dark/light)
- **Pagination**: 5 posts per page (using `pagination.pagerSize`)
- **Google Analytics**: G-F3KDCBQZY7 (GA4)

### Social Links Configured
- LinkedIn: rutger-de-knijf-480182b
- GitHub: rdeknijf
- Stack Overflow: 1393879/rutger-de-knijf
- Keybase: rdeknijf
- RSS feed available

This WARP.md file should provide all the essential information needed for future WARP instances to work effectively with the avalanche2 Hugo site.