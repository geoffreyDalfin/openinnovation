import React from 'react'
import SocketIOClient from 'socket.io-client';
import { Container, Right, Body, Button, Title, Header, Content, Left } from 'native-base';
import { StyleSheet, View, Text, YellowBox, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createGame } from '../API/api';
class Home extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ]);
        this.state = {
            userRight: {},
            userLeft: {},
            game: {},
        }

        // Creating the socket-client instance will automatically connect to the server.
        this.socket = SocketIOClient('http://localhost:3000');
        this.socket.on('AddPoint', this._onReceiveData)
    }

    componentDidMount() {
        this._isMounted = true;
        createGame(this.props.navigation.state.params.playerLeft, this.props.navigation.state.params.playerRight, this.props.navigation.state.params.score).then(data => {
            if (this._isMounted) {
                this.setState({
                    userRight: data.userRight,
                    userLeft: data.userLeft,
                    game: data.Game
                })
            }
        })
    }

    componentWillUnmount() {
        // this.setState({
        //     userRight: {},
        //     userLeft: {},
        //     game: {}
        // })
        this._isMounted = false;
    }

    filterInt = function (value) {
        if (/^(-|\+)?(\d+|Infinity)$/.test(value))
            return Number(value);
        return NaN;
    }

    _onReceiveData = user => {
        this.setState({
            userRight: user.user
        })
        const score = parseInt(this.state.game.scoreLimit);
        if (this.state.userRight.Point == score) {
            Alert.alert(
                'Match terminé',
                `Félicitation ${this.state.userRight.Name}`,
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                ],
                { cancelable: false },
            );
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    {/* <Left>
                    <Button transparent onPress={()=> this.props.navigation.goBack()}>
                        <Icon name='md-walk' />
                    </Button>
                </Left> */}
                    <Body>
                        <Title>BabyFoot Connect</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='autorenew' size={24} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.content}>
                        <View style={styles.cardLeft}>
                            <Text style={styles.NameRight}>{this.state.userLeft.Name}</Text>
                            <Text style={styles.scoreRight}>{this.state.userLeft.Point}</Text>
                        </View>
                        <View style={styles.cardRight}>
                            <Text style={styles.NameRight}>{this.state.userRight.Name}</Text>
                            <Text style={styles.scoreRight}>{this.state.userRight.Point}</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
    },
    cardLeft: {
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
        width: 150,
        height: 150,
        borderWidth: 0.1,
        borderColor: '#000000',
        borderRadius: 8,
        overflow: 'hidden',
        margin: 5,
        backgroundColor: '#3D6DCC',
        alignItems: 'center',
        zIndex: 2
    },
    cardRight: {
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
        width: 150,
        height: 150,
        borderWidth: 0.1,
        borderColor: '#000000',
        borderRadius: 8,
        overflow: 'hidden',
        margin: 5,
        backgroundColor: '#3D6DCC',
        alignItems: 'center',
        zIndex: 2
    },
    NameRight: {
        justifyContent: 'center',
        zIndex: 1,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    scoreRight: {
        justifyContent: 'center',
        zIndex: 1,
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,

    }
})

export default Home;