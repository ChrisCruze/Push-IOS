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
import { Feather as Icon, Ionicons, FontAwesome } from "@expo/vector-icons";

const GoalButtonBackDelete = ({deleteGoal}) => {
    return (
        <TouchableWithoutFeedback  onPress={deleteGoal}>
            <Icon name="trash" size={45} {...{ color:'black' }} />

            {/* <Text style={[styles.buttonText]}>Delete</Text> */}
        </TouchableWithoutFeedback>
    )
}
const GoalButtonBackDashboard = ({navigateToGoal}) => {
    return (
        <TouchableWithoutFeedback  onPress={navigateToGoal}>
            <FontAwesome name="dashboard" size={45} {...{ color :'black'}} />
            {/* <Text style={[styles.buttonText]}>Dashboard</Text> */}
        </TouchableWithoutFeedback>
    )
}

const GoalButtonBack = ({deleteGoal,navigateToGoal}) => {
    return (
        <View style={[styles.standaloneRowBack]}>
            <GoalButtonBackDashboard navigateToGoal={navigateToGoal}/>

            <GoalButtonBackDelete deleteGoal={deleteGoal}/>
        </View>
    )
}
const GoalButtonFront = ({text,totalCount,pushGoal}) => {
    return (
        <TouchableWithoutFeedback  onPress={pushGoal}>
            <View style={[styles.box]}>
                <Text style={styles.buttonText}>{text}</Text>
                <Text style={styles.buttonText}>{totalCount}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const GoalListItem = ({ text, navigateToGoal, pushGoal, totalCount, deleteGoal }) => {
    return (
        <View style={styles.container}>
            <View style={styles.standalone}>
                <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
                    <GoalButtonBack deleteGoal={deleteGoal} navigateToGoal={navigateToGoal}/>
                    <GoalButtonFront text={text} totalCount={totalCount} pushGoal={pushGoal}/>
                </SwipeRow>
            </View>
        </View>
    )
}
export default GoalListItem


const { width } = Dimensions.get("window");
const main_background = "#ecf0f1"
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
    box: {
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: '#D1CDC7',
        shadowOpacity: 1.0,
        backgroundColor: '#ecf0f1',
        height: 120,
        width: width *.90,
        borderRadius: 25,
        borderLeftColor: '#fff',
        borderBottomColor: '#D1CDC7',
        borderTopColor: '#fff',
        borderRightColor: '#D1CDC7',
        fontWeight: 'bold',
        alignSelf: 'center',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',

      },
      buttonText: {
        alignSelf: 'center',
        fontSize: 32,
        fontWeight: 'bold',
      }


});
