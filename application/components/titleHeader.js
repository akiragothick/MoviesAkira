import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { AppLoading } from "expo";
import * as Font from "expo-font";

export default class TitleHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fontLoaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            Aller: require("../../assets/fonts/Aller_Rg.ttf"),
            "Aller-Light": require("../../assets/fonts/Aller_Lt.ttf"),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        if (!this.state.fontLoaded)
            return <AppLoading />

        const { title, style } = this.props

        return (
            <Text style={{ ...styles.text, ...style }}> {title} </Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        fontFamily: "Aller-Light"
    }
})