// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'

// type Image = {
//   url: string;
//   link: string;
// }

// type Props = {
//   images: Image[];
// }

// export default function ImageCarousel({ images }: Props) {
//   const [index, setIndex] = useState<number>(1)

//   return (
//     <View style={{height: 200, backgroundColor: 'plum'}}>
//       <Text>Carousel</Text>

//       {/* Dots Indicator */}
//       <View style={styles.dots}>
//         {images.map((_, i) => (
//           <Text key={i} style={[styles.dot, index === i && styles.activeDot]}>
//             ●
//           </Text>
//         ))}
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   dots: { 
//     position: "absolute",
//     bottom: 0,
//     width: '100%', 
//     flexDirection: "row",
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//   },
//   dot: { color: "#888", margin: 5, fontSize: 18 },
//   activeDot: { color: "red" },
// })

import React, { useRef, useState, useEffect } from "react";
import {
  ScrollView,
  FlatList,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  { url: "https://picsum.photos/id/1018/600/400", link: "https://google.com" },
  { url: "https://picsum.photos/id/1023/600/400", link: "https://openai.com" },
  { url: "https://picsum.photos/id/1020/600/400", link: "https://github.com" },
  { url: "https://picsum.photos/id/37/600/400", link: "https://github.com" },
];

const loopedData = [
  images[images.length - 1], // Last image
  ...images,                 // Original images
  images[0],                 // First image
];

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const flatListRef = useRef<FlatList<any>>(null);

  // Auto-play every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % loopedData.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index);
  }).current;

  return (
    <>
      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={loopedData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true} // Important for ScrollView parent
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={{ width, height: 250 }} />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </>
  );
}
