var directImageUrlPattern = /\.(?:png|jpe?g|gif)(?:\?.*?)?(?:#.*?)?$/i;

chrome.contextMenus.create({
    title: 'Quote image as text',
    contexts: ['image'],
    onclick: function (info, tab) {
        var pageUrl = info.pageUrl;
        if (info.linkUrl
                && !directImageUrlPattern.exec(info.linkUrl)
                && info.linkUrl !== info.srcUrl) {
            pageUrl = info.linkUrl;
        }
        var markdown = '[![](' + info.srcUrl + ')](' + pageUrl + ')';

        document.oncopy = function (e) {
            e.clipboardData.setData('text/plain', markdown);
            e.preventDefault();

            chrome.notifications.create(
                '', {
                    type: 'basic',
                    title: chrome.i18n.getMessage('copied_to_clipboard'),
                    message: markdown,
                    iconUrl: ''
                }, function () {
                }
            );
        };
        document.execCommand('copy', false, null);
    }
});
