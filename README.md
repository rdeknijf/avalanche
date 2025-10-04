# Personal Website - deknijf.com

This is the Hugo code for my personal webpage at [deknijf.com](https://deknijf.com), built with the [PaperMod](https://github.com/adityatelange/hugo-PaperMod/) theme.

## 🚀 Hosting & Deployment

- **Hosting**: GitHub Pages
- **DNS**: Cloudflare (DNS-only mode)
- **Deployment**: Automated via GitHub Actions on push to `master` branch
- **SSL/TLS**: GitHub Pages with custom domain

## 🛠️ Local Development

```bash
# Clone with submodules (for the theme)
git clone --recursive https://github.com/rdeknijf/avalanche2.git

# Or if already cloned, initialize submodules
git submodule update --init --recursive

# Serve locally
hugo serve

# Build for production
hugo --minify
```

## 📝 Content

- Blog posts in `content/posts/`
- Static assets in `static/`
- Theme customization in `themes/papermod/`

## 🔧 Configuration

- Main config: `config.yml`
- Theme: PaperMod (Git submodule)
- Analytics: Google Analytics
- Comments: Disabled
