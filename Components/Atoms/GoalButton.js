import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const GoalButtonBack = () => {
    return (
        <View style={[styles.standaloneRowBack,styles.standaloneRow]}>
            <Text style={styles.backTextWhite}>Edit</Text>
            <Text style={styles.backTextWhite}>Dashboard</Text>
        </View>
    )
}


const GoalButtonFront = ({text}) => {
    return (
    <View style={[styles.standaloneRowFront,styles.standaloneRow]}>
        <View style={[styles.dark_shadow]}>
            <View style={[styles.light_shadow]}>
                <Text>{text}</Text>
            </View>
        </View>
    </View>
    )
}


const GoalButton = ({ text, navigateToGoal, pushGoal, totalCount, deleteGoal }) => {
    return (
        <View style={styles.container}>
            <View style={styles.standalone}>
                <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
                    <GoalButtonBack/>
                    <GoalButtonFront text={text}/>
                </SwipeRow>
            </View>
        </View>
    )
}
export default GoalButton
const { width } = Dimensions.get("window");
const main_background = "#EFEEEE"//E0E5EC
const light_shadow = "#FFFFFF"
const dark_shadow = "#D1CDC7"//a3b1c6
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    standalone: {
        marginTop: 5,
        marginBottom: 5,        
        alignItems: "center",
        justifyContent: "center",        
        flexDirection: "row",

    },
    standaloneRow: {
        borderRadius: 20,
        height: 50,
        width: width *.90,
    },
    standaloneRowFront: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: main_background,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: light_shadow,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,

    },
    backTextWhite: {
        color: 'black',
    },
    spacer: {
        height: 50,
    },


    button: {
        flexDirection: "row",
        height: 50,
        width: width *.90,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
      },
      dark_shadow: {
          borderRadius: 50,
          backgroundColor: main_background,
          shadowColor: dark_shadow,
          shadowRadius: 16,
          shadowOpacity: 0.5,
          shadowOffset: { width: 20, height: 20 },
          flex: .5
      },
      light_shadow: {
          borderRadius: 50,
          backgroundColor: main_background,
          shadowColor: light_shadow,
          shadowRadius: 16,
          shadowOpacity: 0.5,
          shadowOffset: { width: -20, height: -20 },
          flex: .5
      }


});
