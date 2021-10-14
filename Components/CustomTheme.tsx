import { Dimensions, StyleSheet } from "react-native";
import type { Theme } from "./Theme";

const { width } = Dimensions.get("screen");

const CALENDAR_HEIGHT = 250;
const HEADER_HEIGHT = 30;
const DAY_WIDTH_PERCENTAGE = 60 / 7; // 60% of width distributed among 7 weekdays
const HORIZONTAL_MARGIN_PERCENT = 40 / (7 * 2); // 40% of margin horizontal distributed among 7 weekdays
const DAY_HEIGHT_PERCENTAGE = 95 / 6;
const VERTICAL_MARGIN_PERCENT = 3 / (6 * 2);

const text = StyleSheet.create({
  normal: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 17,
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 0.03,
    color: "black",
  },
  disabled: {
    color: "black",
  },
  month: {
    fontWeight: "800",
    fontSize: 11,
    textTransform: "uppercase",
  },
  highlighted: {
    color: "purple",
  },
  title: {
    fontStyle: "normal",
    fontWeight: "bold",
    letterSpacing: 0.2,
    fontSize: 14,
    color: "black",
  },
  weekday: {
    width: `${DAY_WIDTH_PERCENTAGE}%`,
    marginHorizontal: `${HORIZONTAL_MARGIN_PERCENT}%`,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 9,
    fontWeight: "bold",
    color: "black",
  },
  selected: {
    color: "black",
    fontWeight: "700",
  },
});

const container = StyleSheet.create({
  calendar: {
    flex: 1,
    minHeight: CALENDAR_HEIGHT,
    backgroundColor: "white",
  },
  header: {
    height: HEADER_HEIGHT,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  days: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flex: 1,
  },
  weekdays: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  month: {
    width: width / 3,
    height: (CALENDAR_HEIGHT - HEADER_HEIGHT) / 4,
    justifyContent: "center",
  },
  months: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  normalDay: {
    width: `${DAY_WIDTH_PERCENTAGE}%`,
    marginHorizontal: `${HORIZONTAL_MARGIN_PERCENT}%`,
    height: `${DAY_HEIGHT_PERCENTAGE}%`,
    marginVertical: `${VERTICAL_MARGIN_PERCENT}%`,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: "#7D83FF",
    borderRadius: 32 / 3,
    shadowColor: "#7D83FF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

const arrow = StyleSheet.create({
  normal: {
    tintColor: "#7D83FF",
    aspectRatio: 1,
  },
  disabled: {
    tintColor: "#7D83FF",
  },
});

const DefaultTheme: Theme = {
  calendarContainer: container.calendar,
  headerContainer: container.header,
  normalArrowContainer: {},
  disabledArrowContainer: {},
  normalArrowImage: arrow.normal,
  disabledArrowImage: arrow.disabled,
  normalMonthContainer: container.month,
  disabledMonthContainer: {},
  selectedMonthContainer: {},
  normalMonthText: {
    ...text.normal,
    ...text.month,
  },
  disabledMonthText: text.disabled,
  selectedMonthText: text.highlighted,
  titleContainer: {},
  titleText: text.title,
  weekdaysContainer: container.weekdays,
  weekdayText: text.weekday,
  daysContainer: container.days,
  monthsContainer: container.months,
  normalDayContainer: container.normalDay,
  disabledDayContainer: {},
  selectedDayContainer: container.selectedDay,
  extraDayContainer: {},
  startOfWeekDayContainer: {},
  endOfWeekDayContainer: {},
  startOfMonthDayContainer: {},
  endOfMonthDayContainer: {},
  normalDayText: text.normal,
  disabledDayText: text.disabled,
  selectedDayText: text.selected,
  extraDayText: text.disabled,
  startOfWeekDayText: {},
  endOfWeekDayText: {},
  startOfMonthDayText: {},
  endOfMonthDayText: {},
};

export default DefaultTheme;
