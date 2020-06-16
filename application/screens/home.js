import React, { Component } from 'react'
import { homeStyle, contentCardStyle } from '../styles/home.js'
import {
    View,
    ScrollView,
    Keyboard
} from "react-native";
import _ from "lodash";

import TitleHeader from '../components/titleHeader'
import Search from '../components/search'
import CardMovie from '../components/cardMovie'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            query: '',
            page: 1,
            totalPages: 1,
            loading: false,
            movies: []
        }

        this.searchMoviesDebounced = _.debounce(this.searchMovies, 1000);
    }

    componentDidMount() {
        this.getMovies()
    }

    getMovies = () => {

        if (!this.state.loading && this.state.page <= this.state.totalPages) {
            this.setState({ loading: true })

            const api = 'https://api.themoviedb.org/3'
            const key = '6646bc85bad38ac564647a298fbb176c'
            const language = 'es-MX'
            const urlMovies = `${api}/movie/now_playing?api_key=${key}&language=${language}&page=${this.state.page}`

            fetch(urlMovies, {
                method: 'GET'
            })
                .then(resp => resp.json())
                .then(jsonResult => this.paginationMovies(jsonResult))
        }

    }

    searchMovies = query => {

        if (query.length === 0) {
            this.setState({ page: 1, totalPages: 1 })
            this.getMovies()
        }
        else {

            if (!this.state.loading && this.state.page <= this.state.totalPages) {
                this.setState({ loading: true })

                const api = 'https://api.themoviedb.org/3'
                const key = '6646bc85bad38ac564647a298fbb176c'
                const language = 'es-MX'
                const urlMovies = `${api}/search/movie?api_key=${key}&language=${language}&query=${query}&page=${this.state.page}`

                fetch(urlMovies, {
                    method: 'GET'
                })
                    .then(resp => resp.json())
                    .then(jsonResult => this.paginationMovies(jsonResult))
            }

        }
    }

    paginationMovies = jsonResult => {
        console.log(this.state.page)

        if (this.state.page === 1) {
            this.setState({
                movies: jsonResult.results
            })
            this.refs.scrollViewMovies.scrollTo({ x: 0, y: 0, animated: true });
        } else {

            this.setState({
                movies: [...this.state.movies, ...jsonResult.results]
            })
        }

        this.setState({ page: this.state.page + 1, totalPages: jsonResult.total_pages })
        this.setState({ loading: false })
        Keyboard.dismiss()
    }

    getImagePoster = (path, size) => {
        const base_url = 'https://image.tmdb.org/t/p/'

        return `${base_url}${size}${path}`
    }

    getImageCard = path => {
        const poster_sizes = 'w300'
        return this.getImagePoster(path, poster_sizes)
    }

    changeText = text => {
        this.setState({ query: text, page: 1, totalPages: 1 })
        this.searchMoviesDebounced(text);
    }

    infinityLoad = (y, height) => {
        if (y >= height * .8) {
            if (this.state.query.length === 0)
                this.getMovies()
            else
                this.searchMovies(this.state.query)
        }

    }

    render() {
        const renderCards = this.state.movies

        return (
            <View style={homeStyle}>
                <TitleHeader title="Peliculas" />
                <Search onChange={text => this.changeText(text)} />
                <ScrollView ref="scrollViewMovies"
                    style={contentCardStyle.root}
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) =>
                        this.infinityLoad(event.nativeEvent.contentOffset.y, event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height)
                    }
                    scrollEventThrottle={5}
                >
                    <View style={contentCardStyle.container}>
                        {renderCards.map(item => {
                            return <CardMovie
                                id={item.id}
                                title={item.title}
                                image={this.getImageCard(item.poster_path)}
                                key={item.id} />
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     title: {
//         fontFamily: fonts.Family
//     },
//     card: {
//         fontFamily: fonts.Family
//     }
// })