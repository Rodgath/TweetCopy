{
    "manifest_version": 2,
    "name": "Tweet Copy",
    "version": "1.0",

    "description": "Copy tweet text content and paste it elsewhere.",

    "icons": {
        "48": "icons/tweet-copy-48.png"
    },

    "content_scripts": [
        {
        "matches": ["*://*.twitter.com/*", "*://localhost/*"],
        "js": ["app.js"]
        }
    ]
}