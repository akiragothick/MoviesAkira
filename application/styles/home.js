import { StyleSheet, Dimensions } from 'react-native'

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const colors = {
    primary: '#185ee0',
    secondary: '#e6eef9'
}

export const fonts = {
    Family: "Aller-Light",
}

export const homeStyle = StyleSheet.create({
    paddingTop: 30,
    paddingHorizontal: 15,
    flex: 1
})

export const contentCardStyle = StyleSheet.create({
    root: {
        paddingVertical: 5
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
})