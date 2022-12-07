import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

const reviewsList = [
  {
    id: "1",
    userImage: require("../../assets/images/user/user_1.jpg"),
    userName: "Билгүүн",
    reviewDate: "August 2022",
    review: "Бүх зүйл нь дажгүй байсан. Таалагдсан",
  },
  {
    id: "2",
    userImage: require("../../assets/images/user/user_2.jpg"),
    userName: "Батсайхан",
    reviewDate: "August 2022",
    review: "Хүмүүс нь их найрсаг харилцаатай",
  },
  {
    id: "3",
    userImage: require("../../assets/images/user/user_3.jpg"),
    userName: "Хонгор",
    reviewDate: "July 2022",
    review: "Гоё оффис",
  },
  {
    id: "4",
    userImage: require("../../assets/images/user/user_4.jpg"),
    userName: "Солонгоо",
    reviewDate: "June 2022",
    review: "Үнэхээр таалагдсан!",
  },
  {
    id: "5",
    userImage: require("../../assets/images/user/user_5.jpg"),
    userName: "Сувдаа",
    reviewDate: "May 2022",
    review: "Уужим сайхан өрөөтэй юм билээ",
  },
  {
    id: "6",
    userImage: require("../../assets/images/user/user_6.jpg"),
    userName: "Сувдаа",
    reviewDate: "May 2022",
    review: "Дахиж захиална аа",
  },
];

const AllReviewsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View>
        {header()}
        {reviews()}
      </View>
    </SafeAreaView>
  );

  function reviews() {
    const renderItem = ({ item }) => (
      <View style={styles.reviewsWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={item.userImage}
            style={{
              width: 70.0,
              height: 70.0,
              borderRadius: 35.0,
            }}
            resizeMode="cover"
          />
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.blackColor16Regular }}>
              {item.userName}
            </Text>
            <Text
              style={{
                ...Fonts.grayColor16Regular,
                marginVertical: Sizes.fixPadding - 8.0,
              }}
            >
              {item.reviewDate}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="star" size={20} color="#C0CA33" />
              <MaterialIcons name="star" size={20} color="#C0CA33" />
              <MaterialIcons name="star" size={20} color="#C0CA33" />
              <MaterialIcons name="star" size={20} color="#C0CA33" />
              <MaterialIcons name="star" size={20} color="#C0CA33" />
            </View>
          </View>
        </View>
        <Text
          numberOfLines={2}
          style={{ ...Fonts.blackColor18Regular, marginTop: Sizes.fixPadding }}
        >
          {item.review}
        </Text>
      </View>
    );
    return (
      <FlatList
        data={reviewsList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: Sizes.fixPadding * 6.0,
          paddingTop: Sizes.fixPadding,
        }}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            ...Fonts.blackColor20Regular,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          {reviewsList.length} review found
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    height: 60.0,
  },
  reviewsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: "#ECECEC",
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 2.0,
    elevation: 2.0,
    paddingBottom: Sizes.fixPadding * 2.1,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default AllReviewsScreen;
