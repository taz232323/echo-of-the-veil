# J. A. Jacobs Author Website

Multi-page static author website with dark fantasy aesthetic. GitHub Pages ready.

## Site Structure

| File | Description |
|------|-------------|
| `index.html` | Author homepage with featured book |
| `books.html` | Book catalog listing all titles |
| `book-echo-of-the-veil.html` | Dedicated page for The Echo of the Veil |
| `about.html` | Author biography |
| `contact.html` | Contact form and info |
| `styles.css` | Shared responsive styling |
| `script.js` | Shared JS (nav, forms, reveals, particles) |
| `echo-of-the-veil-cover.jpg` | Book cover image |
| `favicon.svg` | Site icon |

## Run Locally

Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

## GitHub Pages

Upload all files to the **root** of a GitHub repository, then go to **Settings → Pages** and set the source to **Deploy from a branch**, branch `main` / `(root)`.

---

## How to Add a New Book

### Step 1: Create the Book Page

1. Duplicate `book-echo-of-the-veil.html`
2. Rename it: `book-your-book-slug.html`
3. Update the content:
   - `<title>` and meta tags
   - Cover image references (replace `echo-of-the-veil-cover.jpg`)
   - Book title, tagline, premise, themes
   - Excerpt text
   - Character info (or remove section)
   - World/lore info (or remove section)
   - Retailer links

### Step 2: Add to Books Page

Open `books.html` and add a new `<article class="book-card">` in the book grid:

```html
<article class="book-card">
  <a href="book-your-book-slug.html" class="book-card-cover">
    <img
      class="book-cover"
      src="your-book-cover.jpg"
      alt="Your Book Title cover"
      width="326"
      height="500"
    >
  </a>
  <div class="book-card-info">
    <p class="eyebrow">New Release</p>
    <h2><a href="book-your-book-slug.html">Your Book Title</a></h2>
    <p class="book-card-tagline">
      A brief tagline describing your book.
    </p>
    <div class="button-row">
      <a class="button button-primary" href="https://amazon.com/your-book" target="_blank" rel="noreferrer">
        Buy Now
      </a>
      <a class="button button-secondary" href="book-your-book-slug.html">Learn More</a>
    </div>
  </div>
</article>
```

### Step 3: Update Homepage (Optional)

If this is the new featured book, update `index.html`:
- Change the hero section cover image and text
- Update the "Featured Book" quick-path link

---

## Shared Components

Each page includes these shared elements (marked with comments in HTML):

1. **SVG Defs** - Reusable icons and symbols
2. **Header** - Navigation with `nav-active` class for current page
3. **Footer** - Site-wide footer with links

When creating new pages, copy these blocks and update the `nav-active` class.

---

## Customization

- **Colors**: Edit CSS variables in `:root` at top of `styles.css`
- **Fonts**: Change `--display`, `--serif`, `--body` font stacks
- **Newsletter**: Wire `data-newsletter` form to Mailchimp, ConvertKit, etc.
- **Contact Form**: Wire `data-contact` form to Formspree, Netlify Forms, etc.

---

## Links

- Amazon: `https://www.amazon.com/Echo-Veil-J-Jacobs/dp/B0GYZ4T7Q2/`
- Bookshop, B&N, Indie buttons are placeholders - replace with final URLs
