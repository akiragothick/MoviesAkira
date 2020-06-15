import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class cardMovie extends Component {
    render() {

        const {
            title
        } = this.props

        return (
            <View style={styles.card}>
               <Text>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: '49%',
        marginTop: 10,
        backgroundColor: '#d4d4d4',
        height: 70
    }
})