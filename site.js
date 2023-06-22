/* global $ */
/* eslint-disable-line */
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

// Nav jQuery Logic
import './nav'
// Self Contained Auto Complete
import AutoComplete from './components/MaterialAutoComplete'
import ScheduleTicker from './components/ScheduleTicker'

// datadog setup
import './utils/analytics'

// CSS
import '../styles/schedule.less'

// Parse out query string for setting default game and date
function getGameMeta() {
    const url = window.location.search.substring(1)

    let gamePk = ''
    let gameDate = ''
    try {
        if (url.indexOf('game_pk') > -1) {
            gamePk = url.split('game_pk')[1] // eslint-disable-line
            gamePk = gamePk.substring(1, 7)
        }
        if (url.indexOf('game_date') > -1) {
            gameDate = url.split('game_date')[1] // eslint-disable-line
            gameDate = gameDate.substring(1, 11)

            // Replace dashes with /'s
            if (gameDate.indexOf('-') > -1) {
                const date = gameDate.split('-')
                gameDate = `${date[1]}/${date[2]}/${date[0]}`
            }
        }
    } catch (ex) {
        console.error(ex) // eslint-disable-line    
    }
    return {
        gamePk,
        gameDate,
    }
}

let queries = []
if (localStorage.getItem('queries')) {
    queries = JSON.parse(localStorage.getItem('queries'))
    if (queries.length > 0) {
        for (let i = 0; i < queries.length; i++) {
            $('#navSavedSearches').append(
                `<div class="menu"><a href="/statcast_search?${queries[i].query}">${queries[i].name}</a></div>`
            )
            if (i === 4 && queries.length > 5) {
                $('#navSavedSearches').append(
                    '<div class="menu"><a href="/user-profile">View All Searches</a></div>'
                )

                break
            }
        }
    }
} else {
    $('#navSavedSearches').append('No Saved Searches.')
}

function App() {
    const meta = getGameMeta()
    let gameDate
    let gamePk = ''

    if (meta.gameDate) {
        gameDate = meta.gameDate
    } else {
        gameDate = moment().subtract(7, 'hours').format('MM-DD-YYYY')

        /* gameDate =
            date.getMonth() +
            1 +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear(); */
    }

    if (meta.gamePk) {
        gamePk = meta.gamePk
    }

    return (
        <div>
            <ScheduleTicker date={gameDate} gamePk={gamePk} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('ticker'))

fetch('/savant/api/v1/trending-players')
    .then((data) => data.json())
    .then((players) => {
        players.forEach((d) => {
            d.is_player = true  // eslint-disable-line
        })

        players.push({
            name: 'Load Random Player',
            pos: '?',
            id: 999999,
            trend: '',
            is_random: true,
            is_player: true,
        })

        players.unshift({
            name: `Trending Players`,
            pos: `pitcher`,
            id: null,
        })
        ReactDOM.render(
            <AutoComplete trendingPlayers={players} />,
            document.getElementById('player_search_container')
        )
    })
