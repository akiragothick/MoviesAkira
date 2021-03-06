import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image, ScrollView } from 'react-native'
import { AppLoading } from "expo";
import * as Font from "expo-font";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import { WebView } from 'react-native-webview';

import Back from "../../assets/svg/back.svg";
import TitleHeader from '../components/titleHeader'

export default class cardMovieExpand extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
            movie: {
                runtime: 0,
                genres: [],
                production_companies: [],
                spoken_languages: []
            },
            videos: []
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            Aller: require("../../assets/fonts/Aller_Rg.ttf"),
            "Aller-Light": require("../../assets/fonts/Aller_Lt.ttf"),
        });
        this.setState({ fontLoaded: true });

        const { id } = this.props
        this.getMovie(id)
        this.getVideos(id)
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

    getVideos = id => {

        const api = 'https://api.themoviedb.org/3'
        const key = '6646bc85bad38ac564647a298fbb176c'
        const language = 'es-MX'

        const urlVideos = `${api}/movie/${id}/videos?api_key=${key}&language=${language}`

        fetch(urlVideos, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(jsonResult => {
                this.setState({
                    videos: jsonResult.results
                })
            })

        // {
        //     "id": "5d5446ef55c92600162572e3",
        //     "iso_639_1": "en",
        //     "iso_3166_1": "US",
        //     "key": "isOGD_7hNIY",
        //     "name": "Parasite [Official Trailer] – In Theaters October 11, 2019",
        //     "site": "YouTube",
        //     "size": 1080,
        //     "type": "Trailer"
        // },

    }

    render() {

        if (!this.state.fontLoaded)
            return <AppLoading />


        const { movie, videos } = this.state;

        const generos = movie.genres.reduce((acc, item) => {
            return [...acc, item.name]
        }, []).splice(0,4).join(', ')

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

                            {
                                videos.length > 0 && (
                                    <>
                                        <TitleHeader style={{ ...styles.title, ...styles.titleVideo }} title="Trailers" />
                                        <View style={{ marginTop: 20, height: 200, width: '100%' }}>
                                            <ScrollView
                                                horizontal={true}
                                                // pagingEnabled={true}
                                                scrollEventThrottle={10}
                                                // bounces={true}
                                                showsHorizontalScrollIndicator={false}
                                                // indicatorStyle={'white'}
                                                >
                                                {videos.map(item => {
                                                    return <View style={{ height: '100%', width: wp("85%"), paddingHorizontal: 5 }} key={item.key}>
                                                        <WebView source={{ uri: `https://www.youtube.com/embed/${item.key}` }}
                                                            javaScriptEnabled={true}
                                                            style={{ width: '100%', height: '100%' }} />
                                                    </View>
                                                })}
                                            </ScrollView>
                                        </View>
                                    </>
                                )
                            }

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
        paddingTop: '155%'
    },
    content: {
        backgroundColor: '#fff',
        minHeight: 2000,
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
        flexDirection: 'row'
    },
    gendersText: {
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
        color: '#a4a4a4',
        fontFamily: "Aller-Light"
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
    },
    titleVideo: {
        marginTop: 20
    }
})