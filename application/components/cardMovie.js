import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

export default class cardMovie extends Component {
    render() {

        const {
            title,
            image,
            style
        } = this.props

        return (
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: image }} />
                <View style={styles.contentText}>
                    <Text style={{ ...style, ...styles.title }}>{title}</Text>
                </View>
            </View>
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
        fontSize: 16
    }
})