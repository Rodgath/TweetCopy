/**
 * TweetCopy
 * 
 * @name        TweetCopy
 * @description Copy tweet text by clicking a button. Simple.
 * @link        https://rodgath.com/TweetCopy
 * @author      Rodgath
 * @authorLink  https://rodgath.com
 * @version     1.0.1
 * @created     Jul 09, 2021
 * @updated     Aug 14, 2021
 * @copyright   Copyright (C) 2021, Rodgath
 * @license     Dual licensed under the MIT and GPL licenses
 * @licenseMIT  http://www.opensource.org/licenses/mit-license.php
 * @licenseGPL  http://www.opensource.org/licenses/gpl-3.0.html
 *      
 */

/** 
 * Copies a string to the clipboard. Must be called from within an
 * event handler such as click. May return false if it failed, but
 * this is not always possible. Browser support for Chrome 43+,
 * Firefox 42+, Safari 10+, Edge and Internet Explorer 10+.
 * Internet Explorer: The clipboard feature may be disabled by
 * an administrator. By default a prompt is shown the first
 * time the clipboard is used (per session).
 * 
 * @param  {String} text The text to copy to clipboard.
 * @return {Boolean} Returns `true` if text is copied, else `false`.
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
        } catch (ex) {
            // console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

/**
 * Get the siblings of an element.
 * 
 * @param  {Node}  elem The element
 * @return {Array}      The siblings
 */
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

/**
 * Get the closest matching element up the DOM tree.
 * 
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
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
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }

    return null;
};

/**
 * Check if it's a mobile device.
 * 
 * @link - http://stackoverflow.com/a/11381730/989439
 * @return {Boolean} Returns `true` if its a mobile device, else `false`.
 */
 const mobileCheck = () => {
    var check = false;
    (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

/**
 * Manage multiple tweet statuses and append the copy button.
 * 
 * @return {Element}  Returns copy button element.
 */
const tweetArticles = () => {

    /**
     * Event listener callback
     * 
     * @param  {Object} e Event object
     * @return {NULL} Returns null
     */
    const listener = (e) => {
        
        let targetElement = e.target;
    
        switch(e.type) {
    
            case 'click':
                
                /* Don't click the tweet */
                e.stopPropagation();
                
                /* incase a button child element is clicked */
                if(e.target !== e.currentTarget) {
                    targetElement = e.currentTarget;
                };
    
                const siblings = getSiblings(targetElement);
    
                let outputContent = '';
                let authorHandle = '';
    
                siblings.forEach((sibling, i) => {
                    if (sibling.tagName !== 'SPAN') return;
    
                    outputContent += sibling.innerText;
                });
                
                const mainTweet = getClosest(targetElement, 'article');
                
                const authorHandleDefault = closestParent.querySelector('.css-901oao.css-bfa6kz.r-14j79pv.r-18u37iz.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0 > span');
                const authorHandleDim = closestParent.querySelector('.css-901oao.css-bfa6kz.r-111h2gw.r-18u37iz.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0 > span');
                const authorHandleDark = closestParent.querySelector('.css-901oao.css-bfa6kz.r-9ilb82.r-18u37iz.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0 > span');

                if (authorHandleDefault) {
                    authorHandle = authorHandleDefault.innerText;
                } else if (authorHandleDim) {
                    authorHandle = authorHandleDim.innerText;
                } else if (authorHandleDark) {
                    authorHandle = authorHandleDark.innerText;
                }

                outputContent += ` — ${authorHandle}`; 
                
                const result = copyToClipboard(outputContent);
    
                if (result) {
                    targetElement.classList.add('tcbutton-click');
                    targetElement.style.fill = 'rgb(23, 191, 99)';
                    targetElement.style.backgroundColor = 'rgba(23,191,99,.1)';
                }
                
                // console.log("copied?", result);
                break;
    
            case 'animationend':
                targetElement.classList.remove('tcbutton-click');
                break;
        }
    }
    
    /**
     * Build the copy button.
     * 
     * @return {Element}  Returns the button element.
     */
    const copyBtn = () => {
        
        const el = document.createElement('button');
    
        el.classList.add('tcbutton', 'tcbutton-effect-morph');
    
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-content-copy" width="18" height="24" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>`
        
        eventType = mobileCheck() ? 'touchstart' : 'click';
        
        el.addEventListener(eventType, listener);
    
        el.addEventListener("animationend", listener);
    
        return el;
    }

    /**
     * Append the copy button.
     * 
     * @param  {Element} statusWrapper Tweet text wrapper.
     * @return {Void}
     */
    const appendCopyBtn = (statusWrapper) => {
    
        /* If the button ExtensionScriptApis, remove it to re-append later */
        Array.prototype.forEach.call(statusWrapper.querySelectorAll('.tcbutton'), function(child, i) {
            child.parentNode.removeChild(child)
        });
        
        statusWrapper.appendChild(copyBtn())
    }
    
    const getStatus = (article) => {
        
        /**
         * Main tweets
         */
        let tweetStatusWrapper = article.querySelector('[data-testid="tweetText"]');
        
        appendCopyBtn(tweetStatusWrapper);
        
        article.dataset.has_copier = true;
    }

    return { getStatus };
}

/**
 * Listen to mouse event over the tweet statuses.
 */
document.addEventListener('mouseover', function(e) {
    
    const t = e.target;
    const tweet = getClosest(t, 'article[role="article"]');
    
    if (!tweet.dataset.has_copier) {
        tweetArticles().getStatus(tweet);
    }
});
