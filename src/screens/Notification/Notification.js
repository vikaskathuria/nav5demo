import React, { Component } from 'react'
import { Text, View, Image, FlatList, Dimensions, TouchableOpacity, TextInput } from 'react-native'

import Modal from "react-native-modal";
const { width, height } = Dimensions.get("window");
import { Button, Overlay } from 'react-native-elements';

let imgArr = []
export default class Notification extends Component {
    constructor(props) {
        super(props)

        this.state = {
            wid: 0,
            hit: 0,
            images: [
                {
                    "image": "images/institutedoc/4da83b73a92dcbc179bdb5b85041584082627957.png",
                    "url": "",
                    "_id": "5e6b2ec4ac50d578177d34b0"
                },
                {
                    "image": "images/institutedoc/2133026c3faa8763b9c898a44a81584438881798.jpeg",
                    "url": "",
                    "_id": "5e709e738dc9b75b06ac3fe3"
                },
                {
                    "image": "images/institutedoc/d3e0c715aeb29865d9d657955f61584438926785.png",
                    "url": "",
                    "_id": "5e709e8e8dc9b75b06ac3fe4"
                },
                {
                    "image": "images/institutedoc/0c571c6a94f3406a9c9b6bf66421584504915107.png",
                    "url": "",
                    "_id": "5e71a053691c58674e0f09a0"
                },
                {
                    "image": "images/institutedoc/838df96ee3d47a8b02e54acc0e11584507341961.jpeg",
                    "url": "",
                    "_id": "5e71a9cf691c58674e0f0aa4"
                },
                {
                    "image": "images/institutedoc/7e721e680c7339fea361c1c9fb11584507356968.png",
                    "url": "",
                    "_id": "5e71a9dc691c58674e0f0aa5"
                },
                {
                    "image": "images/institutedoc/fdf77a6faed0cb14a2581688eb61584507392794.jpeg",
                    "url": "",
                    "_id": "5e71aa00691c58674e0f0aa6"
                },
                {
                    "image": "images/institutedoc/8b008bef96de32230334a612abd1584507436953.png",
                    "url": "",
                    "_id": "5e71aa2c691c58674e0f0aa7"
                },
                {
                    "image": "images/institutedoc/e20751677623b9597b6d436ddbd1584507456506.png",
                    "url": "",
                    "_id": "5e71aa40691c58674e0f0aa9"
                },
                {
                    "image": "images/institutedoc/1fb40dc0acca9e526aaf75f2cfb1584507479183.png",
                    "url": "",
                    "_id": "5e71aa57691c58674e0f0aaa"
                },
                {
                    "image": "images/institutedoc/b4da413bb5f31c6689b1fd35f9a1584507522520.png",
                    "url": "",
                    "_id": "5e71aa82691c58674e0f0aae"
                },
                {
                    "image": "images/institutedoc/ad21bbae25db0413fa41aa3d4ba1584507547244.png",
                    "url": "",
                    "_id": "5e71aa9b691c58674e0f0aaf"
                },
                {
                    "image": "images/institutedoc/186b89aa9f2e1290da5da54d9351584507557137.jpeg",
                    "url": "",
                    "_id": "5e71aaa5691c58674e0f0ab0"
                },
                {
                    "image": "images/institutedoc/7089dd855a53644ed756e3e44141584507566548.jpeg",
                    "url": "",
                    "_id": "5e71aaae691c58674e0f0ab1"
                },
                {
                    "image": "images/institutedoc/d1562eb8937de6a19a5c34285e41584507625395.png",
                    "url": "",
                    "_id": "5e71aaec691c58674e0f0ab5"
                },
                {
                    "image": "images/institutedoc/555abdd224cd14e9850a74052001584507668120.jpeg",
                    "url": "",
                    "_id": "5e71ab16691c58674e0f0ab6"
                },
                {
                    "image": "images/institutedoc/d476769551fd8be31e67e27f3361584507774254.png",
                    "url": "",
                    "_id": "5e71ab80691c58674e0f0abb"
                },
                {
                    "image": "images/institutedoc/cee1888c1b4cc46aebce66e64c21584507847913.png",
                    "url": "",
                    "_id": "5e71abcc691c58674e0f0abc"
                },
                {
                    "image": "images/institutedoc/cc5706bd5d0d39c01605edd7c791584507877986.png",
                    "url": "",
                    "_id": "5e71abeb691c58674e0f0abd"
                },
                {
                    "image": "images/institutedoc/9a44bfa37a7181ffe5a5a0c21f61584508291074.png",
                    "url": "",
                    "_id": "5e71ad85691c58674e0f0ae8"
                },
                {
                    "image": "images/institutedoc/6c61e8ae93c3408beacf12e39031584508312584.jpeg",
                    "url": "",
                    "_id": "5e71ada7691c58674e0f0ae9"
                }
            ],
            modalVisible: false,
            img: '',
            ind: '',
            show: true
        }
    }
    // imgArr.push({ wid: 0, hei: 0, rwid:0, rhei:0 })

    componentDidMount() {
        const { images } = this.state
        console.log('width', width - (width / 20) - (width / 40), 'wwwww', width / 1.09, 'heigth', height / 2)
        imgArr = []
        images.map(async (item, indx) => {
            await Image.getSize('https://guruq.in:4200/' + item.image, (width1, height1) => {
                console.log('-----width', width1, '----heigth', height1, 'ind', indx)
                imgArr.push({ wid: width1, hit: height1 })
                this.setState({})
                console.log('wiiiwiiiwii',((width / 1.09) * height1) / width1,'ll',(width / 1.09) * height1)

                if (width1 >= height1) {
                    if (width1 < width / 1.09) {
                        imgArr[indx].wid = width1
                        imgArr[indx].hit = height1
                    } else {
                        imgArr[indx].wid = width / 1.09
                        imgArr[indx].hit = width / 1.09

                    }
                    this.setState({})
                    console.log('--------', width1, 'ind', indx)
                                    
                } else {
                    imgArr[indx].wid = width1
                    imgArr[indx].hit = height1

                    if (height1 > height / 1.4) {
                        imgArr[indx].hit = height / 1.4
                        imgArr[indx].wid = width / 1.09
                        if (width1 > width / 1.09) {
                            imgArr[indx].hit = ((width / 1.09) * height1) / width1
                            imgArr[indx].wid = width / 1.09
                            this.setState({})

                        } else {
                            imgArr[indx].wid = width1
                            imgArr[indx].hit = height1
                            this.setState({})

                        }

                    } else {
                        imgArr[indx].hit = height / 1.4
                        imgArr[indx].wid = width / 1.09
                        if (width1 > width / 1.09) {
                            imgArr[indx].hit = ((width / 1.09) * height1) / width1
                            imgArr[indx].wid = width / 1.09
                            this.setState({})

                        } else {
                            imgArr[indx].wid = width1
                            imgArr[indx].hit = height1
                            this.setState({})

                        }

                    }


                    this.setState({})
                }

            });

        })


    }


    handlePress = (item, indx) => {
        alert(indx)
        this.setState({ modalVisible: true, img: 'https://guruq.in:4200/' + item.image, ind: indx })
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{ width: width / 4.5, height: height / 10, marginLeft: width / 80, }}>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => this.handlePress(item, index)}
                >
                    <Image
                        source={{ uri: 'https://guruq.in:4200/' + item.image }}
                        style={{ height: '100%', width: '100%', overlayColor: 'red' }}
                    // resizeMode='contain'
                    />

                </TouchableOpacity>

            </View>
        )
    }






    render() {
        const { hit, wid, images, img, ind, show, modalVisible } = this.state
        console.log('notintototttot', imgArr && imgArr[ind] && imgArr[ind].hit ? imgArr[ind].hit : null)

        console.log('imgarr', imgArr, 'ind', ind)
        return (
            <View style={{ flex: 1, }}>

                {modalVisible ?
                    <View style={{ alignItems: "center", justifyContent: 'center', width: '100%', height: '100%', backgroundColor: "rgba(0,0,0,0.75)" }}>
                        <View
                            style={{
                                height: imgArr && imgArr[ind] && imgArr[ind].hit ? imgArr[ind].hit : null, width: imgArr && imgArr[ind] && imgArr[ind].wid ? imgArr[ind].wid : null,

                                backgroundColor: '#fff'
                                
                            }}
                            onStartShouldSetResponder={() => this.setState({ modalVisible: false })}

                        >
                            <Image
                                source={{ uri: img }}
                                style={{
                                    height: imgArr && imgArr[ind] && imgArr[ind].hit ? imgArr[ind].hit : null, width: imgArr && imgArr[ind] && imgArr[ind].wid ? imgArr[ind].wid : null,
                                }}
                                resizeMode='contain'
                            />

                        </View>


                    </View>
                    : null
                }





                <View style={{ flex: 5 }}>

                </View>

                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 2.5, width: '96%' }}>
                        <FlatList
                            data={images}
                            extraData={this.state}
                            horizontal
                            renderItem={this.renderItem}
                        />

                    </View>
                    <View style={{ flex: 2.5 }}>

                    </View>


                </View>


            </View>
        )
    }
}













// if (item.image != '') {


//     await Image.getSize('https://guruq.in:4200/'  + item.image, (w, h) => {
//       if (w >= h) {
//         if (w < width - (width / 20) - (width / 40)) {
//           ww = w
//           hh = h
//         }  else {
//           ww = width - (width / 20) - (width / 40)
//           hh = ((width - (width / 20) - (width / 40)) * h) / w
//         }}else {
//         if (h < height / 1.4) {
//           ww = w
//           hh = h
//           if (ww > (width - (width / 20) - (width / 40))) {
//             ww = width - (width / 20) - (width / 40)
//             hh = ((width - (width / 20) - (width / 40)) * h) / w
//           }
//           else {
//             ww = w;
//             hh = h
//           }
//         }
//         else {
//           hh = height / 1.4
//           ww = ((height / 1.4) * w) / h
//           if (ww > (width - (width / 20) - (width / 40))) {
//             ww = width - (width / 20) - (width / 40)
//             hh = ((width - (width / 20) - (width / 40)) * h) / w
//           }
//           else {
//             hh = height / 1.4
//             ww = ((height / 1.4) * w) / h
//           }
//         }
//       }
//       imgArr[index].wid = parseInt(ww)
//       imgArr[index].hit = parseInt(hh)
//       imgArr[index].rwid = parseInt(w)
//       imgArr[index].rhei = parseInt(h)
//       this.setState({loading:false})

//       // console.log("dataaaa", arrr[index].wid, arrr[index].hei, arrr[index].rwid, arrr[index].rhei)
//     })
//   }
