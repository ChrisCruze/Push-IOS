import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import MetricNeomorph from "./MetricNeomorph";

const Stat = ({ label, value }) => {
  return (
    <MetricNeomorph text={label} number={value} />
    // <View style={styles_stat.stat}>
    //   <Text style={{ ...styles_stat.statText }}>{value}</Text>
    //   <View style={styles_stat.statHold}>
    //     <Text style={{ ...styles_stat.statLabel }}>{label}</Text>
    //   </View>
    // </View>
  );
};

export const Slide = ({ title }) => {
  return (
    <View style={styles_slide.slide}>
      <Text style={{ ...styles_slide.slideText }}>{title}</Text>
    </View>
  );
};

export const CarouselMetrics = ({ items, itemsPerInterval }) => {
  const itemsPerIntervalCalc = itemsPerInterval === undefined ? 1 : itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = width => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerIntervalCalc));
  };

  const getInterval = offset => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1,
        }}
      >
        &bull;
      </Text>,
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={data => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items.map((item, index) => {
          return <Stat key={index} label={item.label} value={item.value} />;
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

const styles_slide = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: "100%",
    flex: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: 200,
  },
  slideText: {
    width: "100%",
    textAlign: "left",
    fontSize: 20,
  },
});

const styles_stat = StyleSheet.create({
  stat: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: "33%",
    flex: 1,
    maxWidth: "33%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  statText: {
    width: "100%",
    textAlign: "left",
    fontSize: 20,
  },
  statHold: {
    width: "100%",
    marginBottom: 8,
  },
  statLabel: {
    width: "100%",
    textAlign: "left",
    fontSize: 11,
    fontWeight: "600",
    paddingTop: 5,
  },
});

export const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: "100%",
    backgroundColor: "#fbfbfb",
    borderColor: "#ebebeb",
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "#fcfcfc",
    shadowOpacity: 1,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  bullets: {
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
});
