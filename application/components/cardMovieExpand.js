import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image, ScrollView } from 'react-native'
import moment from "moment";

import Back from "../../assets/svg/back.svg";
import TitleHeader from '../components/titleHeader'

export default class cardMovieExpand extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: {
                runtime: 0,
                genres: [],
                production_companies: [],
                spoken_languages: []
            }
        }
    }

    componentDidMount() {
        const { id } = this.props
        this.getMovie(id)
    }

    getMovie = id => {

        const api = 'https://api.themoviedb.org/3'
        const key = '6646bc85bad38ac564647a298fbb176c'
        const language = 'es-MX'

        const urlMovie = `${api}/movie/${id}?api_key=${key}&language=${language}`

        fetch(urlMovie, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(jsonResult => {
                this.setState({
                    movie: jsonResult
                })
            })

    }

    onPress = () => {
        this.props.closeModal()
    }

    getImagePoster = (path, size) => {
        const base_url = 'https://image.tmdb.org/t/p/'

        return `${base_url}${size}${path}`
    }

    getImage = path => {
        const poster_sizes = 'original'
        return this.getImagePoster(path, poster_sizes)
    }



    render() {

        const { movie } = this.state;

        const generos = movie.genres.reduce((acc, item) => {
            return [...acc, item.name]
        }, []).join(', ')

        const idiomas = movie.spoken_languages.reduce((acc, item) => {
            return [...acc, item.name]
        }, []).join(',')

        const companies = movie.production_companies.reduce((acc, item) => {
            return [...acc, item.name]
        }, []).join(',')

        const duration = `${parseInt(movie.runtime / 60)}h ${movie.runtime % 60}min`

        return (
            <>
                <View style={styles.card}>
                    <Image style={styles.image} source={{ uri: this.getImage(movie.poster_path) }} />
                    <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <Text style={styles.gendersText}>{generos}</Text>
                                <Text style={styles.durationText}>{duration}</Text>
                            </View>
                            <TitleHeader style={styles.title} title={movie.title} />
                            <Text style={styles.description}>
                                {movie.overview}
                            </Text>
                            <View style={styles.characteristics}>
                                <View style={styles.characteristicItem}>
                                    <Text style={styles.characteristicTitle}>Año:</Text>
                                    <Text style={styles.characteristicValue}>{moment(movie.release_date).format("YYYY")}</Text>
                                </View>
                                <View style={styles.characteristicItem}>
                                    <Text style={styles.characteristicTitle}>País:</Text>
                                    <Text style={styles.characteristicValue}>{movie.production_countries ? movie.production_countries[0].name : ""}</Text>
                                </View>
                                <View style={styles.characteristicItem}>
                                    <Text style={styles.characteristicTitle}>Idiomas:</Text>
                                    <Text style={styles.characteristicValue}>{idiomas}</Text>
                                </View>
                                <View style={styles.characteristicItem}>
                                    <Text style={styles.characteristicTitle}>Compañias:</Text>
                                    <Text style={styles.characteristicValue}>{companies}</Text>
                                </View>
                                <View style={styles.characteristicItem}>
                                    <Text style={styles.characteristicTitle}>Fecha de estreno:</Text>
                                    <Text style={styles.characteristicValue}>{moment(movie.release_date).format("DD/MM/YYYY")}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <TouchableHighlight style={styles.back} onPress={this.onPress}>
                    <Back />
                </TouchableHighlight>
            </>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1
    },
    back: {
        paddingLeft: 5,
        height: 40,
        width: 40,
        position: 'absolute',
        top: 30,
        left: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.30)",
        borderRadius: 40
    },
    image: {
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        paddingTop: 400
    },
    content: {
        backgroundColor: '#fff',
        height: '100%',
        minHeight: 1000,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 40,
        paddingHorizontal: 10
    },
    header: {
        borderStyle: 'solid',
        borderColor: '#d4d4d4',
        borderBottomWidth: 1,
        position: 'absolute',
        width: '106%',
        height: 35,
        display: 'flex',
        flexDirection : 'row'
    },
    gendersText : {
        fontSize: 16,
        textAlign: 'left',
        paddingTop: 10,
        paddingLeft: 15,
        width: '75%',
        color: '#a4a4a4'
    },
    durationText: {
        fontSize: 18,
        textAlign: 'right',
        paddingTop: 10
    },
    title: {
        fontSize: 30,
        fontWeight: '400'
    },
    description: {
        paddingLeft: 6,
        marginTop: 15,
        fontSize: 18,
        color: '#a4a4a4'
    },
    characteristics: {
        marginTop: 30,
        paddingLeft: 6,
    },
    characteristicItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    characteristicTitle: {
        width: '35%',
        fontSize: 20
    },
    characteristicValue: {
        width: '65%',
        fontSize: 20,
        color: '#a4a4a4'
    }
})