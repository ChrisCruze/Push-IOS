import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,TouchableWithoutFeedback,
    View,
    Dimensions
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const GoalButtonBack = () => {
    return (
        <View style={[styles.standaloneRowBack]}>
            <Text style={[styles.standaloneRowBack]}>Edit</Text>
            <Text style={[styles.standaloneRowBack]}>Dashboard</Text>
        </View>
    )
}
const GoalButtonFront = ({text,totalCount,pushGoal}) => {
    return (
        <TouchableWithoutFeedback  onPress={pushGoal}>
    <View style={[styles.standaloneRowFront,styles.standaloneRow]}>
        <View style={[styles.dark_shadow,styles.standaloneRow]}>
            <View style={[styles.light_shadow,styles.standaloneRow]}>
                <Text style={styles.textFont}>{text}</Text>
                <Text style={styles.textFont}>{totalCount}</Text>
            </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
    )
}

const GoalButton = ({ text, navigateToGoal, pushGoal, totalCount, deleteGoal }) => {
    return (
        <View style={styles.container}>
            <View style={styles.standalone}>
                <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
                    <GoalButtonBack/>
                        <GoalButtonFront text={text} totalCount={totalCount} pushGoal={pushGoal}/>
                </SwipeRow>
            </View>
        </View>
    )
}


export default GoalButton
const { width } = Dimensions.get("window");
const main_background = "#EFEEEE"//E0E5EC
const light_shadow = '#FFFFFF'// "#FFFFFF"
const dark_shadow = '#D1CDC7'//"#D1CDC7"//a3b1c6
const styles = StyleSheet.create({
    container: {
        backgroundColor: main_background,
        flex: 1,
    },
    standalone: {
        marginTop: 10,
        marginBottom: 10,        
        alignItems: "center",
        justifyContent: "center",        
        flexDirection: "row",
    },
    standaloneRow: {
        height: 120,
        width: width *.90,
        alignItems: 'center',
    },
    standaloneRowFront: {
        justifyContent: 'center',
        backgroundColor: main_background,
        borderRadius: 20,

    },
    standaloneRowBack: {
        backgroundColor: main_background,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 20,

    },
    textFont: {
        fontSize: 30,

    },
    backTextWhite: {
        color: 'black',

    },
    spacer: {
        height: 50,
    },
      dark_shadow: {
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: main_background,
        shadowColor: dark_shadow,
        shadowRadius: 16,
        shadowOpacity: 0.5,
        shadowOffset: { width: 20, height: 20 },
      },
      light_shadow: {
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: main_background,
        shadowColor: light_shadow,
        shadowRadius: 16,
        shadowOpacity: 0.5,
        shadowOffset: { width: -20, height: -20 },
      }


});
