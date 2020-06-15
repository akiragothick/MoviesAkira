import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, Modal, TouchableHighlight } from 'react-native'

import CardMovieExpand from './cardMovieExpand'

export default class cardMovie extends Component {

    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {

        const { modalVisible } = this.state;

        const {
            id,
            title,
            image,
            style
        } = this.props

        return (
            <>
                <TouchableHighlight style={styles.card}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <View>
                        <Image style={styles.image} source={{ uri: image }} />
                        <View style={styles.contentText}>
                            <Text style={{ ...style, ...styles.title }}>{title}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <Modal visible={modalVisible} animationType="slide">
                    <CardMovieExpand id={id} style={{ ...style }} closeModal={() => { this.setModalVisible(false); }} />
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
        fontSize: 16
    }
})