import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const fn = text => {
    console.log(text)
}

export default function Search(props) {

    const onChange = props.onChange || fn;

    return (
        <TextInput
            style={{ ...style.input, ...props.style }}
            placeholder="Buscar..."
            onChangeText={text => onChange(text)}
        />
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

