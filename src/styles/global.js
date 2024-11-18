import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/colors";

export const globalStyles = StyleSheet.create({
  // defualt Style
  screenContainer: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: "#fff",
  },

  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },

  h2: {
    fontSize: 19,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 18,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 18,
    // fontWeight: "500"
  },
  textSmall: {
    fontSize: 15,
    // width: '80%'
  },
  text: {
    fontSize: 17,
    // width: '80%'
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userAvatar: {
    width: 47,
    height: 47,
    borderRadius: 25,
  },
  avatarSmall: {
    width: 50,
    height: 50,
  },

  // Resuable Style
  shadowBox: {
    // shadowColor: 'black',
    // shadowOpacity: 0.05,
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 2,
    // elevation: 1,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    // backgroundColor: '#F9FFFF',
    padding: 15,
    // gap: 10
  },

  scrollViewContainer: {
    rowGap: 20,
    paddingTop: 25,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },



  // SignIn, SignUp Styles
  backgroundImage: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "cover",
  },
  gradient: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  formContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "transparent",


  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    color: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#fff",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 0,
  },

  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },


  emailErrText: {
    color: 'red',
    textAlign: 'center'
  },


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  // text: {
  //     fontSize: 16,
  //     // fontWeight: '400',
  // },

  bigHeader: {
    fontSize: 22,
    fontWeight: '600',
  },

  // h2: {
  //     fontWeight: '500',
  //     fontSize: 17
  // },

  button: {
    // backgroundColor: '#011736',
    backgroundColor: '#D1A11E',
    padding: 13,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: '#eee',
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonWhite: {
    backgroundColor: '#eee'
  },
  buttonWhiteText: {
    color: '#011736',
    fontWeight: '600',
  },
  buttonShort: {
    width: 'none'
  },

  errorMessage: {
    color: '#011736',
    backgroundColor: '#eee',
    padding: 10
  },

});
