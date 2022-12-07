import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { SharedElement } from "react-navigation-shared-element";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

export const hotelsList = [
  {
    id: "1",
    hotelImage: require("../../assets/images/room/room_1.jpg"),
    hotelName: "Novotel зочид буудал хурлын том өрөө",
    rating: 5.0,
    place: "Сүхбаатарын талбай",
    amount: 70,
  },
  {
    id: "2",
    hotelImage: require("../../assets/images/room/room_2.jpg"),
    hotelName: "Shangrilla center хурлын том өрөө",
    rating: 4.0,
    place: "Сүхбаатарын талбай",
    amount: 100,
  },
  {
    id: "3",
    hotelImage: require("../../assets/images/room/room_3.jpg"),
    hotelName: "Blue Sky tower хурлын заал",
    rating: 5.0,
    place: "Сүхбаатарын талбай",
    amount: 90,
  },
  {
    id: "4",
    hotelImage: require("../../assets/images/room/room_4.jpg"),
    hotelName: "Central tower оффис өрөө",
    rating: 4.0,
    place: "Сүхбаатарын талбай",
    amount: 50,
  },
  {
    id: "5",
    hotelImage: require("../../assets/images/room/room_5.jpg"),
    hotelName: "Encanto tower оффис өрөө",
    rating: 3.0,
    place: "Хан-Уул",
    amount: 40,
  },
  {
    id: "6",
    hotelImage: require("../../assets/images/room/room_6.jpg"),
    hotelName: "Sempinski hotel restaurant",
    rating: 5.0,
    place: "13-р хороолол",
    amount: 180,
  },
];

const HotelScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.push("HotelDetail", {
          item,
        })
      }
      style={styles.recommendedWrapStyle}
    >
      <SharedElement id={item.id}>
        <Image source={item.hotelImage} style={styles.recommendedImageStyle} />
      </SharedElement>
      <View style={styles.recommendedInfoWrapStyle}>
        <View
          style={{
            width: width / 1.7,
          }}
        >
          <Text numberOfLines={2} style={{ ...Fonts.blackColor18Regular }}>
            {item.hotelName}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginVertical: Sizes.fixPadding - 5.0,
              alignItems: "center",
            }}
          >
            {showRating({ number: item.rating })}
            <Text
              style={{
                ...Fonts.grayColor15Regular,
                marginLeft: Sizes.fixPadding,
              }}
            >
              ({item.rating.toFixed(1)})
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="location-on"
              size={16}
              color={Colors.grayColor}
            />
            <Text
              style={{
                ...Fonts.grayColor17Regular,
                marginLeft: Sizes.fixPadding - 3.0,
              }}
            >
              {item.place}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...Fonts.primaryColor30Regular }}>{item.amount}k</Text>
          <Text style={{ ...Fonts.grayColor15Regular }}>1 цаг</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <View>
        {header()}
        {hotels()}
        {mapIcon()}
      </View>
    </View>
  );

  function mapIcon() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("HotelWithMap")}
        style={styles.mapIconWrapStyle}
      >
        <MaterialIcons name="map" size={27} color={Colors.primaryColor} />
      </TouchableOpacity>
    );
  }

  function hotels() {
    return (
      <FlatList
        data={hotelsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: Sizes.fixPadding * 13.0,
          paddingTop: Sizes.fixPadding * 2.0,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text style={{ ...Fonts.blackColor20Regular }}>Оффис</Text>
      </View>
    );
  }

  function showRating({ number }) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {number == 5.0 ||
        number == 4.0 ||
        number == 3.0 ||
        number == 2.0 ||
        number == 1.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
        {number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
        {number == 5.0 || number == 4.0 || number == 3.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
        {number == 5.0 || number == 4.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
        {number == 5.0 ? (
          <MaterialIcons name="star" size={24} color="#C0CA33" />
        ) : (
          <MaterialIcons name="star-outline" size={24} color="#C0CA33" />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1.0,
    height: 60.0,
  },
  recommendedWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding + 7.0,
    elevation: 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  recommendedImageStyle: {
    height: 200.0,
    width: "100%",
    borderTopLeftRadius: Sizes.fixPadding + 7.0,
    borderTopRightRadius: Sizes.fixPadding + 7.0,
  },
  recommendedInfoWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Sizes.fixPadding + 5.0,
  },
  mapIconWrapStyle: {
    position: "absolute",
    bottom: 143.0,
    right: 15.0,
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HotelScreen;
