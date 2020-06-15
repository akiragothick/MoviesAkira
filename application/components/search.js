import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

export default function Search(props) {
    return (
        <TextInput
            style={{ ...style.input, ...props.style }}
            placeholder="Buscar..." />
    )
}

const style = StyleSheet.create({
    input: {
        fontSize: 22,
        backgroundColor: '#e4e4e4',
        height: 40,
        paddingLeft: 15,
        marginVertical: 10
    }
})

