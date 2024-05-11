/**
 * ghost-dynamic-footnotes 1.0.0 (https://github.com/Inoryum-Ltd/ghost-dynamic-footnotes)
 * A simple script for creating dynamic footnotes for Ghost CMS.
 * Copyright 2024 Inoryum Ltd (https://inoryum.com)
 * Released under MIT License
 * Released on:  May 11, 2024
 */
function createDynamicFootnotes(customOptions = {}) {
    // Default configuration
    const defaultOptions = {
      backArrowSVG: '<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 530 480"><defs><style>.cls-1{stroke-width:0px;}</style></defs><path class="cls-1" d="m456.02,42.06c0-17.7,14.3-32,32-32s32,14.3,32,32v96c0,53-43,96-96,96H117.32l73.4,73.4c12.5,12.5,12.5,32.8,0,45.3s-32.8,12.5-45.3,0L17.42,224.76c-12.5-12.5-12.5-32.8,0-45.3L145.42,51.46c12.5-12.5,32.8-12.5,45.3,0s12.5,32.8,0,45.3l-73.4,73.3h306.7c17.7,0,32-14.3,32-32V42.06Z"/><rect class="cls-1" x="13" y="423.5" width="511.01" height="56" rx="28" ry="28"/></svg>',
      postContentSelector: '.gh-content', 
      footnotesDiv: 'footnotes',
      footnotesList: 'footnotes-list',
      footnoteItem: 'footnote',
      footnoteLink: 'footnote-link',
    };
  
    // Merge with custom options (overriding defaults)
    const options = { ...defaultOptions, ...customOptions };
  
    const regexRef = /\[\[([0-9]+)\]\](?!:)/g;
    const regexDef = /\[\[([0-9]+)\]\]:/g;
  
    // Get post content elements
    const postContentElements = document.querySelectorAll(options.postContentSelector);
  
    // Footnote reference handling
    postContentElements.forEach(postContent => {
      postContent.querySelectorAll('p, li, figcaption, .kg-callout-text, blockquote em, blockquote, div').forEach(element => {
        for (let i = 0; i < element.childNodes.length; i++) {
          const node = element.childNodes[i];
          if (node.nodeName === "#text") {
            let textchunk = node.nodeValue;
            const matches = textchunk.matchAll(regexRef);
            for (const match of matches) {
              const firstPiece = textchunk.slice(0, match.index);
              const lastPiece = textchunk.slice(match.index + match[0].length);
              const linkPiece = `<sup id="fnref:${match[1]}"><a href="#fn:${match[1]}" class="${options.footnoteLink}">${match[1]}</a></sup>`; 
              const newPiece = firstPiece + linkPiece + lastPiece;
              const tmp = document.createRange().createContextualFragment(newPiece);
              node.replaceWith(tmp);
            }
          }
        }
      });
    });
  
    // Footnote definition handling
    postContentElements.forEach(postContent => {
      const footnotesDiv = document.createElement('div');
      footnotesDiv.classList.add(options.footnotesDiv); 
      const footnotesList = document.createElement('ol');
      footnotesList.classList.add(options.footnotesList); 
  
      postContent.querySelectorAll('p').forEach(node => { 
        let textchunk = node.innerHTML;
        const matches = textchunk.matchAll(regexDef);
        for (const match of matches) {
          let listItem = document.createElement('li');
          listItem.classList.add(options.footnoteItem); 
          listItem.id = `fn:${match[1]}`;
  
          let referredContent = textchunk.slice(match.index + match[0].length);
          textchunk = textchunk.replace(match[0] + referredContent, '');
          listItem.innerHTML = `<p>${referredContent} <a href="#fnref:${match[1]}" title="Back"> ${options.backArrowSVG}</a></p>`; // (SVG code omitted)
          listItem.setAttribute('data-reference-content', referredContent);
          footnotesList.appendChild(listItem);
        }
  
        node.innerHTML = textchunk;
        if (node.textContent.trim() === '') {
          node.remove();
        }
      });
  
      if (footnotesList.childNodes.length > 0) {
        footnotesDiv.appendChild(footnotesList);
        postContent.appendChild(footnotesDiv);
      }
    });
   
  
    // Tooltip
    const footnotes = document.querySelectorAll(`li.${options.footnoteItem}`); 
    footnotes.forEach(footnote => {
      const referenceContent = footnote.getAttribute('data-reference-content');
      let tempElement = document.createElement('div');
      tempElement.innerHTML = referenceContent;
      const plainTextContent = tempElement.textContent || tempElement.innerText;
      const link = document.querySelector(`a.${options.footnoteLink}[href="#${footnote.id}"]`); 
      if (link) {
        link.setAttribute('title', plainTextContent);
      }
    });
  }