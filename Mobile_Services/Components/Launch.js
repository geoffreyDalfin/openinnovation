import React from 'react'
import { Button, Input } from 'react-native-elements';
import { SafeAreaView, StyleSheet, Platform, Dimensions, View, StatusBar, TextInput, Text, Picker } from 'react-native'

const { height, width } = Dimensions.get('window')
class Launch extends React.Component {
    constructor(props) {
        super(props)
        this.playerRight = ""
        this.playerLeft = ""
        this.state = {
            score: 0
        }
    }

    componentWillMount() {
        this.startHeaderHeight = 130
        this.startHeaderMargin = 5
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 80 + StatusBar.currentHeight
            this.startHeaderMargin = 10 + StatusBar.currentHeight

        }
    }
    _playerOneInputChanged(text) {
        this.playerRight = text
    }
    _playerTwoInputChanged(text) {
        this.playerLeft = text
    }
    _launchGame() {
        if (this.playerRight.length > 0 && this.playerLeft.length > 0 && this.state.score > 0) {
            this.props.navigation.navigate("Home", { playerRight: this.playerRight, playerLeft: this.playerLeft, score: this.state.score });
            this.playerRight = ""
            this.playerLeft = ""
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        height: this.startHeaderHeight, backgroundColor: 'white',
                        borderBottomWidth: 1, borderBottomColor: '#dddddd',
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={styles.title}>Babyfoot Connect</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <View style={{ marginTop: 50 }}>
                            <Input
                                style={{ margin: 17 }}
                                placeholder='Joueur Droit'
                                shake={true}
                                onChangeText={(text) => this._playerOneInputChanged(text)}
                            />
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <Input
                                placeholder='Joueur Gauche'
                                shake={true}
                                onChangeText={(text) => this._playerTwoInputChanged(text)}
                            />
                        </View>
                        <Text style={{ marginTop: 50, fontSize: 18, fontWeight: '700', paddingHorizontal: 17 }}>Score Limite :</Text>
                        <View style={{
                            marginTop: 50, alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                            <Picker
                                selectedValue={this.state.score}
                                style={{ height: 50, width: 100, justifyContent: 'center' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ score: itemValue })
                                }>
                                <Picker.Item label="0" value="0" />
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 5,
                        left: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button buttonStyle={{
                            backgroundColor: '#4f9deb',
                        }}
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                left: 0,
                                width: 370,
                                marginLeft: 2
                            }} title="Valider" onPress={() => this._launchGame()}>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

    },
    title: {
        justifyContent: 'center',

        zIndex: 1,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
});

export default Launch;