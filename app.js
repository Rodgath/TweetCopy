
/* 
Copies a string to the clipboard. Must be called from within an
event handler such as click. May return false if it failed, but
this is not always possible. Browser support for Chrome 43+,
Firefox 42+, Safari 10+, Edge and Internet Explorer 10+.
Internet Explorer: The clipboard feature may be disabled by
an administrator. By default a prompt is shown the first
time the clipboard is used (per session).
 */
const copyToClipboard = (text) => {

    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {

        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } 
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}


const getSiblings = (elem) => {
    let siblings = [];
    let sibling = elem.parentNode.firstChild;
    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
    }
    return siblings;
};

const getClosest = (elem, selector) => {

    /* Element.matches() polyfill */
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

   /*  Get closest match */
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }

    return null;
};


/* Manage multiple tweet statuses */
const tweetArticles = () => {

    const downloadBtn = () => {}

    const appendDownloadBtn = () => {}

    const getTweets = () => {}

}

/* Manage single tweet status */
const tweetArticle = () => {}
