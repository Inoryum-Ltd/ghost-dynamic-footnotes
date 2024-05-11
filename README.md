# Dynamic Footnotes for Ghost CMS

Enhance your Ghost CMS blog posts with dynamic footnotes using this JavaScript script. Automatically convert footnote references into interactive links and create beautifully formatted footnote sections at the end of your posts.

## Features

- **Automatic Footnote Creation:** Easily add footnotes to your posts using double bracket notation (e.g., `[[1]]`).
- **Interactive Links:** Readers can effortlessly navigate between the footnote reference and its corresponding text.
- **Customizable Styles:** Tailor the appearance of footnotes and links to match your blog's design.
- **Tooltip Enhancement:** Hover over a footnote link to display the full footnote text as a tooltip.
- **Customizable Back Arrow:** Change the SVG used for the "back to reference" link in footnotes.
- **Multiple Post Support:** Works seamlessly with multiple posts on a single page.

## Installation

### Option 1: Theme Integration

1. **Download the Script:**
   - Download the `ghost-ghost-dynamic-footnotes.js` file from this repository.

2. **Upload to Your Theme:**
   - If you're using a custom Ghost theme:
     - Upload the `ghost-ghost-dynamic-footnotes.js` file to your theme's assets directory (usually `/assets/js/`).
   - If you're using the default Casper theme:
     - Create a new folder named `footnotes` inside the `assets/js` directory of your theme.
     - Upload the `ghost-dynamic-footnotes.js` file into this new `footnotes` folder.

3. **Include the Script in Your Theme:**
   - Open your Ghost theme's template file, usually `default.hbs` or `post.hbs`.
   - Add the following `<script>` tag just before the closing `</body>` tag:

     ```handlebars
     <script src="{{asset "js/ghost-dynamic-footnotes.js"}}"></script>
     ```
     *Ensure that `asset "js/ghost-dynamic-footnotes.js"` points to the correct path of your uploaded `ghost-dynamic-footnotes.js` file.*

4. **Call the Function:**
   - Still in your theme's template file, add a script tag to call the `createDynamicFootnotes()` function, optionally passing your customizations:

     ```html
     <script>
         createDynamicFootnotes({
             // Your customization options (if any)
         });
     </script>
     ```

### Option 2: Code Injection

1. **Copy the Script:**
   - Download the `ghost-dynamic-footnotes.js` file from this repository.

2. **Upload to Ghost:**
   - Go to your Ghost admin dashboard.
   - Navigate to **Settings** > **Code Injection**.

3. **Inject the Script:**
   - In the **Site Footer** section, paste the following code:

     ```html
     <script src="YOUR_ASSET_URL_HERE"></script>
     ```
     *Replace `YOUR_ASSET_URL_HERE` with the URL of your uploaded `ghost-dynamic-footnotes.js` file. You can host this file on a service like GitHub or use a CDN.*

4. **Call the Function:**
   - Still in the **Site Footer** section, add a script tag to call the `createDynamicFootnotes()` function, optionally passing your customizations:

     ```html
     <script>
         createDynamicFootnotes({
             // Your customization options (if any)
         });
     </script>
     ```

## Customization

You can customize various aspects of the footnotes by passing options to the `createDynamicFootnotes()` function:

| Option               | Description                                                   | Default Value | Customization                                      |
|----------------------|---------------------------------------------------------------|---------------|----------------------------------------------------|
| `postContentSelector`| Selector for the container of post content.                   | `.gh-content` | Change to a custom class if your theme differs.  |
| `footnotesDiv`       | Custom class for the footnotes container.                    | `footnotes`   | Customize the class for the footnotes container.  |
| `footnotesList`      | Custom class for the footnote list (ol).                     | None          | Specify a custom class for the footnotes list.    |
| `footnoteItem`       | Custom class for each footnote item (li).                    | None          | Define a custom class for each footnote item.     |
| `footnoteLink`       | Custom class for the footnote links.                         | `footnote-link` | Set a custom class for the footnote links.       |
| `backArrowSVG`       | Custom SVG code for the "back to reference" link in footnotes.| Default SVG   | Replace the default SVG with your own SVG code.  |

## Contributing

Feel free to fork this repository and submit pull requests to improve this script. Contributions are welcome!

## License

This script is open-source and available under the [MIT License](LICENSE).