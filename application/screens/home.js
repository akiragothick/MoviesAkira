import React, { Component } from 'react'
import { dimensions, colors, fonts, homeStyle, contentCardStyle } from '../styles/home.js'
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import TitleHeader from '../components/titleHeader'
import Search from '../components/search'
import CardMovie from '../components/cardMovie'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fontLoaded: false,
            movies: []
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            Aller: require("../../assets/fonts/Aller_Rg.ttf"),
            "Aller-Light": require("../../assets/fonts/Aller_Lt.ttf"),
        });
        this.setState({ fontLoaded: true });

        this.getMovies()
    }

    getMovies = (page = 1) => {

        const api = 'https://api.themoviedb.org/3'
        const key = '6646bc85bad38ac564647a298fbb176c'
        const language = 'es-MX'

        const urlMovies = `${api}/movie/now_playing?api_key=${key}&language=${language}&page=${page}`

        fetch(urlMovies, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(jsonResult => {
                this.setState({
                    movies: jsonResult.results
                })
            })

    }

    getImagePoster = (path, size) => {
        const base_url = 'https://image.tmdb.org/t/p/'

        return `${base_url}${size}${path}`
    }

    getImageCard = path => {
        const poster_sizes = 'w300'
        return this.getImagePoster(path, poster_sizes)
    }



    render() {
        if (!this.state.fontLoaded)
            return <AppLoading />

        const renderCards = this.state.movies

        return (
            <View style={homeStyle}>
                <TitleHeader style={styles.title} title="Peliculas" />
                <Search />
                <ScrollView
                    style={contentCardStyle.root}
                    showsVerticalScrollIndicator={false} >
                    <View style={contentCardStyle.container}>
                        {renderCards.map((item, index) => {
                            return <CardMovie
                                id={item.id}
                                title={item.title}
                                image={this.getImageCard(item.poster_path)}
                                style={styles.card}
                                key={item.id} />
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.Family
    },
    card: {
        fontFamily: fonts.Family
    }
})