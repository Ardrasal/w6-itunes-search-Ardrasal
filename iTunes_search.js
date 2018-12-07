// const searchButton = document.getElementById('search-button')
// const searchField = document.getElementById('search-field')
// const searchLanguage = document.getElementById('search-language')

// searchButton.addEventListener('click', function (event)) {
//     let query = searchField.Value
//     let language = searchLanguage.Value
    
//     if (language) {
//         query += ' language:${language}'
//     }

//     $.get(https://itunes.apple.com/search?parameterkeyvalue)
// }


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
                    .text(`Total count: ${results.resultCount}`)
        )
        .append(results.results.map(searchHtml))
    })
}

function searchHtml (search) {
    return `
        <p><a href="${search.html_url}">${search.artistName}</a> - ${search.collectionName || 'no description'}</p>
        `
}
