// import React, { Component } from 'react'
// import { Text, View, SafeAreaView, FlatList, StyleSheet, Dimensions, ImageBackground, Image, ScrollView } from 'react-native'
// import Header from '../../components/Header/Header'
// import Carousel from 'react-native-snap-carousel';
// import { Icon, Badge, Input, } from "react-native-elements";
// import { AirbnbRating, Rating, } from 'react-native-ratings';
// const { width, height } = Dimensions.get("window");
// let menu = require('../../assets/images/star.png')

// class TestScreen extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             star: 5,
//             snap: [
//                 {
//                     img: require('../../assets/images/kidss.jpeg'),
//                     title: 'Kids Dress',
//                     rp: '$19',
//                 },
//                 {
//                     img: require('../../assets/images/choco.jpg'),
//                     title: 'Chocolates',
//                     rp: '$20',
//                 },
//                 {
//                     img: require('../../assets/images/totbag.png'),
//                     title: 'Bags',
//                     rp: '$25',
//                 },
//                 {
//                     img: require('../../assets/images/totbag.png'),
//                     title: 'Bags',
//                     rp: '$25',
//                 },

//                 {
//                     img: require('../../assets/images/wallet.png'),
//                     title: 'Wallet',
//                     rp: '$35',
//                 },

//             ],
//             iconList: [
//                 {
//                     name: "md-pizza",
//                     type: "ionicon",
//                     title: 'Food'
//                 },
//                 {
//                     name: "ios-shirt",
//                     type: "ionicon",
//                     title: 'Clothes'

//                 },
//                 {
//                     name: "md-bus",
//                     type: "ionicon",
//                     title: 'Travel'

//                 },
//                 {
//                     name: "female",
//                     type: "font-awesome",
//                     title: 'Beauty'

//                 },
//                 {
//                     name: "ios-gift",
//                     type: "ionicon",
//                     title: 'Gifts'

//                 },

//             ],
//             snap1: [
//                 {
//                     img: require('../../assets/images/chole.jpg'),
//                     title: 'Amrit Sweets',
//                     km: "2Km Away (562 Reviews)",
//                 },
//                 {
//                     img: require('../../assets/images/coat.jpg'),
//                     title: 'Ratanlal Clothes',
//                     km: "2Km Away (562 Reviews)",

//                 },
//                 {
//                     img: require('../../assets/images/kidss.jpeg'),
//                     title: 'Kids Dress',
//                     km: "2Km Away (562 Reviews)",

//                 },
//                 {
//                     img: require('../../assets/images/totbag.png'),
//                     title: 'Bags',
//                     km: "2Km Away (562 Reviews)",

//                 },

//                 {
//                     img: require('../../assets/images/wallet.png'),
//                     title: 'Wallet',
//                     km: "2Km Away (562 Reviews)",

//                 },

//             ],
//             orientation: ''
//         }
//     }


//     getOrientation = () => {
//         if (this.refs.rootView) {
//             if (Dimensions.get('window').width < Dimensions.get('window').height) {
//                 this.setState({ orientation: 'portrait' });
//             }
//             else {
//                 this.setState({ orientation: 'landscape' });
//             }
//         }
//     }


//     componentDidMount() {
//         this.getOrientation();

//         Dimensions.addEventListener('change', () => {
//             this.getOrientation();
//         });
//     }



//     renderCarouselItem = ({ item }) => {
//         return (
//             <View style={styles.cardContainer}>
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <Image style={{
//                         height: '100%', width: '100%', borderRadius: 24, flex: 1
//                     }} source={item.img} resizeMode='cover'
//                     />

//                 </View>
//                 <View style={{
//                     position: 'absolute', bottom: 0, height: height / 20, width: height / 3, justifyContent: 'center', alignItems: 'center'
//                 }}>
//                     <View style={{ flex: 1, width: '85%', justifyContent: 'space-between', flexDirection: 'row', }}>

//                         <Text style={styles.cardTitle}>{item.title}</Text>
//                         <Text style={styles.cardTitle}>{item.rp}</Text>
//                     </View>

//                 </View>
//             </View>

//         )
//     }
//     renderItem = ({ item, index }) => {
//         return (
//             <View>
//                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                     <Icon
//                         raised
//                         name={item.name}
//                         type={item.type}
//                         color='#DB90C5'
//                         size={height / 30}
//                         onPress={() => console.log('hello')} />
//                     <Text style={{}}>{item.title}</Text>

//                 </View>
//                 <View>

//                 </View>

//             </View>
//         )
//     }

//     renderItem1 = ({ item, index }) => {
//         const { orientation } = this.state
//         return (
//             <View style={{
//                 height: '50%', width: "50%",
//                 // padding:height/20,
//                 backgroundColor: "#fff",
//                 // margin: height / 80,
//                 elevation: 8,


//             }}>
//                 <View style={{ flex: 1, }}>
//                     <View style={{ flex: 6.5, }}>

//                         <Image style={{
//                             padding: orientation == 'portrait' ? 0 : height / 15,
//                             height: orientation == 'portrait' ? height / 8 : '100%', width: '100%',
//                         }} source={item.img} resizeMode='cover'
//                         />
//                     </View>
//                     <View style={{ flex: 3.5, justifyContent: 'center', alignItems: 'center', padding: orientation == 'portrait' ? height / 60 : height / 25, }}>
//                         <View style={{ flex: 1, }}>
//                             <Text style={{ fontSize: height / 45 }}>{item.title}</Text>
//                             <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: height / 150 }}>
//                                 <Icon
//                                     name="location"
//                                     type="evilicon"
//                                     size={height / 50}
//                                     color='#DB90C5'                            // containerStyle={{ marginRight:width/70,}}
//                                     underlayColor='transparent'
//                                 />

//                                 <Text style={{ fontSize: height / 68, color: "lightgrey" }}>{item.km}</Text>
//                             </View>
//                             <View style={{ alignItems: 'flex-start' }}>
//                                 <Rating imageSize={10} readonly startingValue={5} />

//                             </View>

//                         </View>

//                     </View>

//                 </View>

//             </View>
//         )
//     }

//     render() {
//         const { snap, iconList, snap1, orientation } = this.state
//         return (
//             // <View style={{flex:1}}>

//             // <View style={{
//             //     width: '100%', height: "85%", padding: 5,
//             //     // alignItems: orientation == 'portrait' ? 'center' : 'flex-start' 
//             //     flexDirection: 'row',
//             //     flexWrap: 'wrap'

//             // }}>

//             //     <View style={{ width: "50%", height: '50%', padding: 5,  }}>
//             //     <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'red',}}>

//             //     </View>

//             //     </View>
//             // <View style={{ width: "50%", height: '50%', padding: 5,}}>
//             // <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'red' }}>

//             // </View>

//             // </View>


//             // </View>
//             // </View>

//             <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
//                 <View style={{ flex: 1, }}>
//                     <View ref="rootView" style={{ flex: orientation == 'portrait' ? 1.2 : 2, }}>
//                         <Header />
//                     </View>
//                     <View ref="rootView" style={{ flex: orientation == 'portrait' ? 8.8 : 8, }}>
//                         <View style={{ flex: 1, }}>
//                             <View ref="rootView" style={{ flex: 2.5, justifyContent: 'center', alignItems: 'flex-end' }}>

//                                 <FlatList
//                                     data={snap}
//                                     style={{ width: "95%" }}
//                                     horizontal
//                                     renderItem={this.renderCarouselItem}
//                                     keyExtractor={(item, index) => index.toString()}

//                                 />
//                             </View>
//                             <View ref="rootView" style={{ flex: orientation == 'portrait' ? 2 : 3, justifyContent: 'center', alignItems: 'flex-end' }}>
//                                 <View style={{ flex: 1, width: '95%', }}>
//                                     <FlatList
//                                         data={iconList}
//                                         contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
//                                         keyExtractor={(item, index) => index.toString()}
//                                         horizontal
//                                         renderItem={this.renderItem}
//                                     />

//                                 </View>

//                             </View>
//                             <View ref="rootView" style={{ flex: orientation == 'portrait' ? 6.5 : 4, justifyContent: 'center', alignItems: 'center' }}>

//                                 <View style={{
//                                     flex: 1, width: '95%',
//                                     backgroundColor: 'pink'
//                                 }}>
//                                     <ScrollView style={{ flex: 1, }} >
//                                         <View style={{ flexDirection: 'row', width:'100%',height:'100%'}}>
//                                             {snap1.map((item) => {
//                                                 return (
//                                                     // <ScrollView style={{flex:1}}>

//                                                     <View style={{ width: width / 2, height: width / 3, padding: 5, }}>
//                                                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
//                                                             <Text>{item.title}</Text>
//                                                         </View>

//                                                     </View>
//                                                     // </ScrollView>

//                                                 )
//                                             })
//                                             }
//                                         </View>

//                                         {/* 
//                                         <FlatList
//                                             data={snap1}
//                                             extraData={this.state}
//                                             // horizontal={orientation == 'portrait' ? false : true}

//                                             // numColumns={2}
//                                             // contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
//                                             keyExtractor={(item, index) => index.toString()}
//                                             renderItem={this.renderItem1}
//                                             showsVerticalScrollIndicator={false}
//                                         /> */}

//                                     </ScrollView>


//                                 </View>

//                             </View>


//                         </View>
//                     </View>


//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// export default TestScreen
// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject
//     },
//     cardContainer: {
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         width: height / 3,
//         borderRadius: 24,
//         marginRight: width / 50
//     },
//     cardTitle: {
//         color: 'white',
//         fontSize: height / 41,
//         fontWeight: 'bold'
//     },
//     container:
//     {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: (Platform.OS === 'ios') ? 20 : 0
//     },

//     text:
//     {
//         fontSize: 22,
//         color: 'white',
//         fontWeight: 'bold'
//     }
// });

