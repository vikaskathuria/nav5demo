import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native'
import Header from '../../components/Header/Header'
import Carousel from 'react-native-snap-carousel';
import { Icon, Badge, Input,Rating, } from "react-native-elements";
import {  AirbnbRating } from 'react-native-ratings';
const { width, height } = Dimensions.get("window");
let menu = require('../../assets/images/star.png')

class TestScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            star:5,
            snap: [
                {
                    img: require('../../assets/images/kidss.jpeg'),
                    title: 'Kids Dress',
                    rp: '$19',
                },
                {
                    img: require('../../assets/images/choco.jpg'),
                    title: 'Chocolates',
                    rp: '$20',
                },
                {
                    img: require('../../assets/images/totbag.png'),
                    title: 'Bags',
                    rp: '$25',
                },
                {
                    img: require('../../assets/images/totbag.png'),
                    title: 'Bags',
                    rp: '$25',
                },

                {
                    img: require('../../assets/images/wallet.png'),
                    title: 'Wallet',
                    rp: '$35',
                },

            ],
            iconList: [
                {
                    name: "md-pizza",
                    type: "ionicon",
                    title: 'Food'
                },
                {
                    name: "ios-shirt",
                    type: "ionicon",
                    title: 'Clothes'

                },
                {
                    name: "md-bus",
                    type: "ionicon",
                    title: 'Travel'

                },
                {
                    name: "female",
                    type: "font-awesome",
                    title: 'Beauty'

                },
                {
                    name: "ios-gift",
                    type: "ionicon",
                    title: 'Gifts'

                },

            ],
            snap1: [
                {
                    img: require('../../assets/images/chole.jpg'),
                    title: 'Amrit Sweets',
                    km: "2Km Away (562 Reviews)",
                },
                {
                    img: require('../../assets/images/coat.jpg'),
                    title: 'Ratanlal Clothes',
                    km: "2Km Away (562 Reviews)",

                },
                {
                    img: require('../../assets/images/kidss.jpeg'),
                    title: 'Kids Dress',
                    km: "2Km Away (562 Reviews)",

                },
                {
                    img: require('../../assets/images/totbag.png'),
                    title: 'Bags',
                    km: "2Km Away (562 Reviews)",

                },

                {
                    img: require('../../assets/images/wallet.png'),
                    title: 'Wallet',
                    km: "2Km Away (562 Reviews)",

                },

            ],
            orientation: ''
        }
    }


    getOrientation = () => {
        if (this.refs.rootView) {
            if (Dimensions.get('window').width < Dimensions.get('window').height) {
                this.setState({ orientation: 'portrait' });
            }
            else {
                this.setState({ orientation: 'landscape' });

            }
        }
    }


    componentDidMount() {
        this.getOrientation();

        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
    }



    renderCarouselItem = ({ item }) => {
        return (
            <View ref="rootView" style={styles.cardContainer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{
                        height: '100%', width: '100%', borderRadius: 24, flex: 1
                    }} source={item.img} resizeMode='cover'
                    />

                </View>
                <View style={{
                    position: 'absolute', bottom: 0, height: height / 20, width: height / 3, justifyContent: 'center', alignItems: 'center'
                }}>
                    <View style={{ flex: 1, width: '85%', justifyContent: 'space-between', flexDirection: 'row', }}>

                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardTitle}>{item.rp}</Text>
                    </View>

                </View>
            </View>

        )
    }
    renderItem = ({ item, index }) => {
        const { orientation } = this.state

        return (
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        raised
                        name={item.name}
                        type={item.type}
                        color='#DB90C5'
                        // size={ orientation == 'portrait' ?  height/30 : height/15}
                        onPress={() => console.log('hello')} />
                    <Text style={{}}>{item.title}</Text>

                </View>
                <View>

                </View>

            </View>
        )
    }

    renderItem1 = ({ item, index }) => {
        const { orientation } = this.state
        return (
            <View ref="rootView" style={{
                // height: height / 3.5, width: height / 4.4,
                // padding:height/20,
                backgroundColor: "#fff",
                margin: height / 80,
                elevation: 8,
                

            }}>
                <View style={{ flex: 1, }}>
                    <View ref="rootView" style={{ flex: 6.5, }}>

                        <Image ref="rootView" style={{
                            padding: orientation == 'portrait' ? 0: height / 15,
                            height: orientation == 'portrait' ? height/8 :'100%', width: '100%',
                        }} source={item.img} resizeMode='cover'
                        />
                    </View>
                    <View ref="rootView" style={{ flex: 3.5, justifyContent: 'center', alignItems: 'center', padding: orientation == 'portrait' ? height/60 : height / 25, }}>
                        <View style={{ flex: 1,}}>
                            <Text style={{ fontSize: height / 45 }}>{item.title}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: height / 150 }}>
                                <Icon
                                    name="location"
                                    type="evilicon"
                                    size={height / 50}
                                    color='#DB90C5'                            // containerStyle={{ marginRight:width/70,}}
                                    underlayColor='transparent'
                                />

                                <Text style={{ fontSize: height / 68, color: "lightgrey" }}>{item.km}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Rating imageSize={10} readonly startingValue={5} />

                            </View>

                        </View>

                    </View>

                </View>

            </View>
        )
    }

    render() {
        const { snap, iconList, snap1, orientation } = this.state  
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
                <View style={{ flex: 1, }}>
                    <View ref="rootView" style={{ flex: orientation == 'portrait' ? 1.2 : 2, }}>
                        <Header onPress={()=>this.props.navigation.navigate('Profile')}
                        ref="rootView"
                        orientation={orientation == 'portrait'? "p":"l"}
                        />
                    </View>
                    <View ref="rootView" style={{ flex: orientation == 'portrait' ? 8.8 : 8, }}>
                        <View style={{ flex: 1, }}>
                            <View ref="rootView" style={{ flex: 2.5, justifyContent: 'center', alignItems: 'flex-end' }}>

                                <FlatList
                                    data={snap}
                                    style={{ width: "95%" }}
                                    horizontal
                                    renderItem={this.renderCarouselItem}
                                    keyExtractor={(item, index) => index.toString()}

                                />
                            </View>
                            <View ref="rootView" style={{ flex: orientation == 'portrait' ? 2 : 3, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <View style={{ flex: 1, width: '95%', }}>
                                    <FlatList
                                        data={iconList}
                                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        renderItem={this.renderItem}
                                    />

                                </View>

                            </View>
                            <View ref="rootView" style={{ flex: orientation == 'portrait' ? 6.5 : 4, justifyContent: 'center', alignItems: 'center' }}>
                                <View ref="rootView" style={{ flex: 1, width: '95%', alignItems: orientation == 'portrait' ? 'center' : 'flex-start' }}>
                                        <FlatList
                                        ref="rootView"
                                            data={snap1}
                                            extraData={this.state}
                                            horizontal={orientation == 'portrait' ? false : true}
                                            keyExtractor={(item, index) => index.toString()}

                                            numColumns={orientation == 'portrait' ? 2 :0}
                                            key={(orientation == 'portrait'  ? 'h' : 'v')}
                                            renderItem={this.renderItem1}
                                            showsVerticalScrollIndicator={false}
                                        />
                                </View>

                            </View>


                        </View>
                    </View>


                </View>
            </SafeAreaView>
        )
    }
}

export default TestScreen
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    cardContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: height / 3,
        borderRadius: 24,
        marginRight: width / 50
    },
    cardTitle: {
        color: 'white',
        fontSize: height / 41,
        fontWeight: 'bold'
    },
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    text:
    {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    }
});

