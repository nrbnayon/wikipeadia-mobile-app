import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';


const width = Dimensions.get("window").width - 20;

let currentSlideIndex = 0;
let intervalId;

export default function Slider({data, title, onSlidePress}) {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => onSlidePress(item)}>
        <View>
        <Image source={{ uri: item.thumbnail }} style={styles.slideImages} />
        <View style={{width}}>
          <Text 
          numberOfLines={2}
          style={styles.title1}>{item.title}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>

    );
  }

  const flatList = useRef();

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });

  const handleScrollTo = (index) => {
    flatList.current.scrollToIndex({ animated: false, index });
  };


  const startSlider = () => {
    if (currentSlideIndex <= dataToRender.length - 2) {
      intervalId = setInterval(() => {
        flatList.current.scrollToIndex({ animated: true, index: currentSlideIndex + 1});
      }, 4000);
    }else{
      pauseSlider()
    }
    handleScrollTo(1);
  };

  const pauseSlider = () => {
    clearInterval(intervalId)
  };

  useEffect(() => {
    if(dataToRender.length && flatList.current)
    {
      startSlider()
    }
    return () => {
      pauseSlider()
    }
  },[dataToRender.length])


  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig: viewabilityConfig.current, onViewableItemsChanged: onViewableItemsChanged.current },
  ]);

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataToRender([...newData]);
  }, [data.length]);

  useEffect(() => {
    const length = dataToRender.length;
    // reset slide to first
    if (visibleSlideIndex === length - 1 && length) {
      handleScrollTo(1);
    }

    // reset slide to last
    if (visibleSlideIndex === 0 && length) {
      handleScrollTo(length - 2);
    }

    const lastSlide = currentSlideIndex === length - 1 ;
    const firstSlide = currentSlideIndex === 0;

    if(lastSlide && length) setActiveSlideIndex(0);
    else if(firstSlide && length) setActiveSlideIndex(length - 2);
    else setActiveSlideIndex(currentSlideIndex - 1);
  }, [visibleSlideIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.sliderHeader}>
        <Text style={styles.title}>
            {title}
        </Text>
        <View style={styles.slideIndicator}>
            <SlideIndicators data={data} activeSlideIndex={activeSlideIndex} />
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={dataToRender}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={renderItem}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const SlideIndicators = ({data, activeSlideIndex}) =>
data.map((item, index )=> {
    return <View 
    key={item.id} 
      style={[ styles.slides, {
        backgroundColor: activeSlideIndex === index ? "#383838" : "transparent"
      }]}
    />
  })

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
    backgroundColor: "#FFF",
  },
  sliderHeader: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingVertical: 5,
  },
  title: {
    fontWeight: 700, 
    color: "#383838", 
    fontSize: 22,
 },
 slideIndicator: {
    flexDirection: "row", 
    alignItems: "center",
},
slides: {
    width: 12, 
    height: 12, 
    borderRadius: 6,
    marginLeft: 5,
    borderWidth: 2,
},
slideImages: { width, height: width / 1.7, borderRadius: 7 },
 title1:  { fontWeight: 700, color: "#383838", fontSize: 22 },
});



// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState, useRef } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Dimensions,
// } from "react-native";

// const data = [
//   {
//     id: "123",
//     thumbnail:
//       "https://res.cloudinary.com/duhq2xow7/image/upload/v1682288213/dypqv74vjnfzu9jz3r1p.jpg",
//     title: "Know Everything about crypto Know Everything about crypto ",
//     author: "Admin",
//   },
//   {
//     id: "1235",
//     thumbnail:
//       "https://res.cloudinary.com/duhq2xow7/image/upload/v1682191255/jaxmcz54eltn4pffrlde.jpg",
//     title: "Tell me about your self",
//     author: "Admin",
//   },
//   {
//     id: "12345",
//     thumbnail:
//       "https://res.cloudinary.com/duhq2xow7/image/upload/v1682261600/obzcantqncsay1g0ddyp.jpg",
//     title: "How are you bangladesh",
//     author: "Admin",
//   },
//   {
//     id: "123456",
//     thumbnail:
//       "https://res.cloudinary.com/duhq2xow7/image/upload/v1682191238/qzaojizjsqta42qbhejk.png",
//     title: "Last slide",
//     author: "Admin",
//   },
// ];

// const width = Dimensions.get("window").width - 20;

// let currentSlideIndex = 0;
// let intervalId;

// export default function App() {
//   const [dataToRender, setDataToRender] = useState([]);
//   const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
//   const [activeSlideIndex, setActiveSlideIndex] = useState(0);

//   const flatList = useRef();

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     currentSlideIndex = viewableItems[0]?.index || 0;
//     setVisibleSlideIndex(currentSlideIndex);
//   });

//   const handleScrollTo = (index) => {
//     flatList.current.scrollToIndex({ animated: false, index });
//   };

//   const startSlider = () => {
//     if (currentSlideIndex <= dataToRender.length - 2) {
//       intervalId = setInterval(() => {
//         flatList.current.scrollToIndex({
//           animated: true,
//           index: currentSlideIndex + 1,
//         });
//       }, 4000);
//     } else {
//       pauseSlider();
//     }
//     handleScrollTo(1);
//   };

//   const pauseSlider = () => {
//     clearInterval(intervalId);
//   };

//   useEffect(() => {
//     if (dataToRender.length && flatList.current) {
//       startSlider();
//     }
//   }, [dataToRender.length]);

//   const viewabilityConfig = useRef({
//     viewAreaCoveragePercentThreshold: 50,
//   });

//   const viewabilityConfigCallbackPairs = useRef([
//     {
//       viewabilityConfig: viewabilityConfig.current,
//       onViewableItemsChanged: onViewableItemsChanged.current,
//     },
//   ]);

//   useEffect(() => {
//     const newData = [[...data].pop(), ...data, [...data].shift()];
//     setDataToRender([...newData]);
//   }, [data.length]);

//   useEffect(() => {
//     const length = dataToRender.length;
//     // reset slide to first
//     if (visibleSlideIndex === length - 1 && length) {
//       handleScrollTo(1);
//     }

//     // reset slide to last
//     if (visibleSlideIndex === 0 && length) {
//       handleScrollTo(length - 2);
//     }

//     const lastSlide = currentSlideIndex === length - 1;
//     const firstSlide = currentSlideIndex === 0;

//     if (lastSlide && length) setActiveSlideIndex(0);
//     else if (firstSlide && length) setActiveSlideIndex(length - 2);
//     else setActiveSlideIndex(currentSlideIndex - 1);
//   }, [visibleSlideIndex]);

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           paddingVertical: 5,
//         }}
//       >
//         <Text style={{ fontWeight: 700, color: "#383838", fontSize: 22 }}>
//           Featured Posts
//         </Text>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           {data.map((item, index) => {
//             return (
//               <View
//                 key={item.id}
//                 style={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: 6,
//                   marginLeft: 5,
//                   borderWidth: 2,
//                   backgroundColor:
//                     activeSlideIndex === index ? "#383838" : "transparent",
//                 }}
//               />
//             );
//           })}
//         </View>
//       </View>
//       <FlatList
//         ref={flatList}
//         data={dataToRender}
//         keyExtractor={(item, index) => item.id + index}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         // initialScrollIndex={0}
//         getItemLayout={(_, index) => ({
//           length: width,
//           offset: width * index,
//           index,
//         })}
//         viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
//         renderItem={({ item }) => {
//           return (
//             <View>
//               <Image
//                 source={{ uri: item.thumbnail }}
//                 style={{ width, height: width / 1.7, borderRadius: 7 }}
//               />
//               <View style={{ width }}>
//                 <Text
//                   numberOfLines={2}
//                   style={{ fontWeight: 700, color: "#383838", fontSize: 22 }}
//                 >
//                   {item.title}
//                 </Text>
//               </View>
//             </View>
//           );
//         }}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignSelf: "center",
//     width,
//     paddingTop: 25,
//     backgroundColor: "#FFF",
//   },
// });
