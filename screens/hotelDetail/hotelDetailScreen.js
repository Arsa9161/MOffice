import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import GoogleMap from "../../components/googleMapScreeen";
import { Snackbar } from "react-native-paper";

const { width } = Dimensions.get("screen");

const facilitiesList = [
  {
    id: "1",
    facilityImage: require("../../assets/images/icons/parking.png"),
    facilityName: "Үнэгүй зогсоол",
  },
  {
    id: "2",
    facilityImage: require("../../assets/images/icons/lift.png"),
    facilityName: "Лифт",
  },
  {
    id: "3",
    facilityImage: require("../../assets/images/icons/wifi.png"),
    facilityName: "Wifi",
  },
  {
    id: "4",
    facilityImage: require("../../assets/images/icons/kitchen.png"),
    facilityName: "Гал тогоо",
  },
  {
    id: "5",
    facilityImage: require("../../assets/images/icons/ac.png"),
    facilityName: "Агааржуулалт",
  },
  {
    id: "6",
    facilityImage: require("../../assets/images/icons/tv.png"),
    facilityName: "Телевиз",
  },
];

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
    userImage: require("../../assets/images/user/user_4.jpg"),
    userName: "Солонгоо",
    reviewDate: "June 2022",
    review: "Үнэхээр таалагдсан!",
  },
  {
    id: "3",
    userImage: require("../../assets/images/user/user_6.jpg"),
    userName: "Сувдаа",
    reviewDate: "May 2022",
    review: "Дахиж захиална аа",
  },
];

const relatedPlacesList = [
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

const HotelDetailScreen = ({ navigation, route }) => {
  const item = route.params.item;

  const [state, setState] = useState({
    hotels: [
      {
        image: item.hotelImage,
      },
      {
        image: item.hotelImage,
      },
      {
        image: item.hotelImage,
      },
    ],
    activeSlide: 0,
    isInFavorite: false,
    showSnackBar: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { hotels, activeSlide, isInFavorite, showSnackBar } = state;

  const renderItem = ({ item, index }) => (
    <View
      style={{
        ...styles.reviewsWrapStyle,
        marginTop: index == 0 ? Sizes.fixPadding + 5.0 : 0.0,
      }}
    >
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
          <Text style={{ ...Fonts.blackColor16Regular }}>{item.userName}</Text>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {hotelImages()}
              {hotelInfo()}
              {divider()}
              {title({ title: "дагалдах үйлчилгээ" })}
              {facilities()}
              {divider()}
              {title({ title: "Дэлгэрэнгүй" })}
              {aboutPlace()}
              {divider()}
              {title({ title: "Байршил" })}
              {location()}
              {divider()}
              {title({ title: "Сэтгэгдэл" })}
            </>
          }
          data={reviewsList}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: Sizes.fixPadding * 7.0,
          }}
          ListFooterComponent={
            <>
              {showAllReviewsButton()}
              {title({ title: "Төстэй газрууд" })}
              {relatedPlaces()}
            </>
          }
        />
      </View>
      {amountInfoAndBookNowButton()}
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => updateState({ showSnackBar: false })}
      >
        {isInFavorite
          ? "Таалагдсан жагсаалтанд нэмлээ"
          : "Таалагдсан жагсаалтнаас хаслаа"}
      </Snackbar>
    </SafeAreaView>
  );

  function amountInfoAndBookNowButton() {
    return (
      <View style={styles.amountInfoAndBookNowButtonWrapStyle}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={{ ...Fonts.blackColor20Bold }}>{item.amount}к</Text>
          <Text
            style={{
              ...Fonts.blackColor16Regular,
              alignSelf: "flex-end",
            }}
          >
            {` / 1 цаг`}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.push("BookNow", {
              booking: "hotel",
              amount: item.amount,
            })
          }
          style={styles.bookNowButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor19Regular }}>Захиалах</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function relatedPlaces() {
    const renderItem = ({ item }) => (
      <View style={{ width: 160.0, marginRight: Sizes.fixPadding * 2.0 }}>
        <Image
          source={item.hotelImage}
          style={{
            width: 160.0,
            height: 140.0,
            borderRadius: Sizes.fixPadding + 5.0,
          }}
          resizeMode="cover"
        />
        <Text
          numberOfLines={2}
          style={{
            ...Fonts.blackColor18Bold,
            marginBottom: Sizes.fixPadding - 5.0,
          }}
        >
          {item.hotelName}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="location-on"
            size={20}
            color={Colors.grayColor}
          />
          <Text
            style={{
              ...Fonts.grayColor15Regular,
              marginLeft: Sizes.fixPadding - 5.0,
            }}
          >
            {item.place}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="star" size={20} color="#C0CA33" />
          <Text
            style={{
              ...Fonts.grayColor15Regular,
              marginLeft: Sizes.fixPadding - 5.0,
            }}
          >
            ({item.rating.toFixed(1)})
          </Text>
        </View>
      </View>
    );
    return (
      <FlatList
        horizontal
        data={relatedPlacesList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: Sizes.fixPadding * 2.0,
          paddingVertical: Sizes.fixPadding * 2.0,
        }}
      />
    );
  }

  function showAllReviewsButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("AllReviews")}
        style={styles.showAllReviewsButtonStyle}
      >
        <Text style={{ ...Fonts.primaryColor18Regular }}>
          Бүх сэтгэгдэл харах
        </Text>
      </TouchableOpacity>
    );
  }

  function location() {
    return (
      <View style={styles.mapStyle}>
        <GoogleMap latitude={47.8864} longitude={106.9057} height={250} />
      </View>
    );
  }

  function sleepingArrangementsInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={styles.sleepingArrangementsWrapStyle}>
          <Image
            source={require("../../assets/images/icons/bed.png")}
            style={{
              width: 40.0,
              height: 40.0,
              marginBottom: Sizes.fixPadding,
            }}
            resizeMode="cover"
          />
          <Text style={{ ...Fonts.blackColor16Regular }}>Bedroom 1</Text>
          <Text style={{ ...Fonts.grayColor16Regular }}>1 queen bed</Text>
        </View>
        <View style={styles.sleepingArrangementsWrapStyle}>
          <Image
            source={require("../../assets/images/icons/bed.png")}
            style={{
              width: 40.0,
              height: 40.0,
              marginBottom: Sizes.fixPadding,
            }}
            resizeMode="cover"
          />
          <Text style={{ ...Fonts.blackColor16Regular }}>Bedroom 1</Text>
          <Text style={{ ...Fonts.grayColor16Regular }}>1 king bed</Text>
        </View>
      </View>
    );
  }

  function aboutPlace() {
    return (
      <Text
        style={{
          ...Fonts.grayColor16Regular,
          marginHorizontal: Sizes.fixPadding * 2.0,
          textAlign: "justify",
          marginTop: Sizes.fixPadding,
        }}
      >
        Энэхүү хурлын өрөө нь 20-25 хүний багтаамжтай ба албан байгууллага, хамт
        олноороо ашиглах боломжтой. Дотроо хурал хэлэлцээр хийх бүхий л зүйлс
        багтсаны
      </Text>
    );
  }

  function facilities() {
    const renderItem = ({ item }) => (
      <View
        style={{
          alignItems: "center",
          marginRight: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={styles.facilityImageWrapStyle}>
          <Image
            source={item.facilityImage}
            style={{ height: 40.0, width: 40.0 }}
            resizeMode="cover"
          />
        </View>
        <Text
          style={{
            ...Fonts.primaryColor15Regular,
            marginTop: Sizes.fixPadding,
          }}
        >
          {item.facilityName}
        </Text>
      </View>
    );
    return (
      <FlatList
        horizontal
        data={facilitiesList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: Sizes.fixPadding * 2.0,
          paddingTop: Sizes.fixPadding * 2.0,
        }}
      />
    );
  }

  function title({ title }) {
    return (
      <Text
        style={{
          ...Fonts.blackColor18Regular,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        {title}
      </Text>
    );
  }

  function hotelInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          numberOfLines={2}
          style={{
            ...Fonts.blackColor18Bold,
            marginTop: Sizes.fixPadding + 5.0,
          }}
        >
          {item.hotelName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: Sizes.fixPadding,
          }}
        >
          <MaterialIcons name="star" size={17} color="#C0CA33" />
          <Text
            style={{
              ...Fonts.blackColor15Regular,
              marginLeft: Sizes.fixPadding - 5.0,
            }}
          >
            {item.rating.toFixed(1)}
          </Text>
          <Text
            style={{
              ...Fonts.grayColor15Regular,
              marginLeft: Sizes.fixPadding - 5.0,
            }}
          >
            (12)
          </Text>
        </View>
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.grayColor,
          height: 0.7,
          marginVertical: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      ></View>
    );
  }

  function _renderItem({ item, index }) {
    return (
      <Image
        source={item.image}
        style={{
          width: width,
          height: 400.0,
        }}
        resizeMode="cover"
      />
    );
  }

  function hotelImages() {
    return (
      <SharedElement id={item.id}>
        <View>
          <Carousel
            data={hotels}
            sliderWidth={width}
            autoplay={true}
            loop={true}
            autoplayInterval={4000}
            itemWidth={width}
            renderItem={_renderItem}
            onSnapToItem={(index) => updateState({ activeSlide: index })}
          />
          {pagination()}
        </View>
      </SharedElement>
    );
  }

  function pagination() {
    return (
      <Pagination
        dotsLength={hotels.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.sliderPaginationWrapStyle}
        dotStyle={styles.sliderActiveDotStyle}
        inactiveDotStyle={styles.sliderInactiveDotStyle}
      />
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.pop()}
          />
          <Text numberOfLines={1} style={styles.headerTextStyle}>
            {item.hotelName}
          </Text>
        </View>
        <MaterialIcons
          name={isInFavorite ? "favorite" : "favorite-border"}
          size={24}
          color="black"
          onPress={() =>
            updateState({
              isInFavorite: !isInFavorite,
              showSnackBar: true,
            })
          }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  headerTextStyle: {
    ...Fonts.blackColor20Regular,
    width: width / 1.5,
    marginLeft: Sizes.fixPadding + 5.0,
  },
  sliderActiveDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6.0,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: Sizes.fixPadding - 15.0,
  },
  sliderInactiveDotStyle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.primaryColor,
  },
  sliderPaginationWrapStyle: {
    position: "absolute",
    bottom: -20.0,
    left: 0.0,
    right: 0.0,
  },
  facilityImageWrapStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 70.0,
    height: 70.0,
    borderRadius: 35.0,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    elevation: 2.0,
  },
  sleepingArrangementsWrapStyle: {
    flex: 0.45,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding + 5.0,
    padding: Sizes.fixPadding * 2.0,
    elevation: 2.0,
  },
  mapStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    overflow: "hidden",
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
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
  showAllReviewsButtonStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 4.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding + 5.0,
    borderWidth: 1.0,
    height: 55.0,
  },
  amountInfoAndBookNowButtonWrapStyle: {
    position: "absolute",
    bottom: 0.0,
    height: 70.0,
    left: 0.0,
    right: 0.0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderTopColor: "#ECECEC",
    borderTopWidth: 0.5,
  },
  bookNowButtonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    borderRadius: Sizes.fixPadding + 5.0,
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 60.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
    elevation: 0.0,
  },
});

export default HotelDetailScreen;
