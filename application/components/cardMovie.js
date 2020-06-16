import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, Modal, TouchableHighlight } from 'react-native'
import { AppLoading } from "expo";
import * as Font from "expo-font";

import CardMovieExpand from './cardMovieExpand'

export default class cardMovie extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fontLoaded: false,
            modalVisible: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            Aller: require("../../assets/fonts/Aller_Rg.ttf"),
            "Aller-Light": require("../../assets/fonts/Aller_Lt.ttf"),
        });
        this.setState({ fontLoaded: true });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {

        if (!this.state.fontLoaded)
            return <AppLoading />

        const { modalVisible } = this.state;

        const {
            id,
            title,
            image
        } = this.props

        return (
            <>
                <TouchableHighlight style={styles.card} onPress={() => { this.setModalVisible(true); }}>
                    <View>
                        <Image style={styles.image} source={{ uri: image }} />
                        <View style={styles.contentText}>
                            <Text style={{ ...styles.title }}>{title}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <Modal visible={modalVisible} animationType="slide">
                    <CardMovieExpand id={id} closeModal={() => { this.setModalVisible(false); }} />
                </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: '49%',
        marginTop: 10,
        maxHeight: '100%',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    contentText: {
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    title: {
        fontSize: 16,
        fontFamily: "Aller-Light"
    }
})