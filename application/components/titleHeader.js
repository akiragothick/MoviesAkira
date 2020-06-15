import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default function TitleHeader(props) {
    return (
        <Text style={{ ...style.text, ...props.style }}> {props.title} </Text>
    )
}

const style = StyleSheet.create({
    text: {
        fontSize: 40
    }
})