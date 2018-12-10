/* global $, jQuery */

$('#search-button').on('click', runSearch)
$('#search-field').on('keyup', function (event) {
    if (event.key === 'Enter') {
        runSearch()
    }
})

function runSearch () {
    let query = $('#search-field').val()
    let music = $('#search-music').val()

    if (music) {
        query += ` music:${music}`
    }

    $.get('https://itunes.apple.com/search', 
        { term: query,
        media: `music`},
        // dataType, `json`, 
        function (results) {
            var results = JSON.parse(results);
        console.log(results)
        let $resultsDiv = $('#search-results')

        $resultsDiv
            .empty()
            .append(
                $('<p>')
                    .text(`Your search has turned up: ${results.resultCount} results`)
        )
        
        .append(results.results.map(searchHtml))
    })
}

function searchHtml (search) {
    return `
        <p><a href="${search.html_url}">${search.artistName}</a> - ${search.trackName} - ${search.collectionName || 'no description'}
        <img src="${search.artworkUrl100}">
        <audio src="${search.previewUrl}" controls=""></audio></p>
        `
}

// document.createElement("output");