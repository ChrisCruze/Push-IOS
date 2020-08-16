import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import TableGrid from "../Molecules/TableGrid";
import GoalPageButtons from "../Molecules/GoalPageButtons";
import Header from "../Molecules/Header";
import {
  goals_data_last_n_days_from_transformed_goals_array,
  goals_data_last_n_days_from_transformed_goals_array_chunked,
} from "../Atoms/BarChart.functions";
import BarChart from "../Atoms/BarChart";
import { useGoalsPull } from "../../API";
import Theme from "../Atoms/Theme";
import DashboardTimeStamps from "../Molecules/DashboardTimeStamps";
import { DataFlattenConvertGoals } from "../Atoms/BarChart.functions";
import moment from "moment";
import NotificationsModal from "../Atoms/NotificationsModal";
import NotificationPopup from "react-native-push-notification-popup";

const GoalBarChart = ({ goals_filtered }) => {
  const goals_count_by_day_array = goals_data_last_n_days_from_transformed_goals_array({
    goals: goals_filtered,
    number_of_days: 7,
    start_date: moment(),
  });
  return (
    <View style={styles.barchartContainer}>
      <Text>Your week at a glance:</Text>
      <BarChart chartData={goals_count_by_day_array} />
    </View>
  );
};

const GoalTableGrid = ({ goals_filtered }) => {
  const goals_count_by_day_array_chunked = goals_data_last_n_days_from_transformed_goals_array_chunked(
    {
      goals: goals_filtered,
      number_of_days: 28,
      chunk_size: 7,
    },
  );
  return <TableGrid list_of_lists={goals_count_by_day_array_chunked} />;
};

const GoalHeader = ({ goals_filtered, back }) => {
  const goals_dict = goals_filtered[0];
  return (
    <Header title={goals_dict.title || "-"} sub_title={" "} logout={back} logout_text={"Back"} />
  );
};

const Goal = ({ navigation }) => {
  const back = () => navigation.navigate("Goals");
  const _id = navigation.getParam("id");
  const [scrollAnimation] = useState(new Animated.Value(0));
  const { goals, refetch } = useGoalsPull();
  useEffect(() => {
    refetch();
  }, []);
  const goals_filtered = goals.filter(function(D) {
    return D["_id"] == _id;
  });
  const [modalState, setModalState] = useState({ visible: false });
  const [popup, setPopUp] = useState(null);
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollAnimation } },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
      >
        <GoalHeader goals_filtered={goals_filtered} back={back} />
        <GoalPageButtons
          {...goals_filtered[0]}
          _id={_id}
          navigation={navigation}
          refetch={refetch}
          setModalState={setModalState}
          goals={goals}
          popup={popup}
        />
        <GoalBarChart goals_filtered={goals_filtered} />
        <GoalTableGrid goals_filtered={goals_filtered} />
        <DashboardTimeStamps
          timeStamps={DataFlattenConvertGoals(goals_filtered)}
          navigation={navigation}
          hideTitle={true}
        />
      </Animated.ScrollView>
      <NotificationsModal
        modalState={modalState}
        setModalState={setModalState}
      ></NotificationsModal>
      <NotificationPopup ref={ref => setPopUp(ref)}></NotificationPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.background,
  },
  barchartContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
});

export default Goal;
