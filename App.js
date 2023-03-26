import { useEffect, useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";

const Loading = () => (
  <ActivityIndicator
    color="#72b34863"
    size="large"
    style={[styles.loading, { transform: [{ translateX: -10 }] }]}
  />
);

export default function App({}) {
  //   // this javascript will be injected on page load
  //   const injectedJs = `
  // window.postMessage(window.location.href);
  // `;

  const webviewref = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  // const [canGoForward, setCanGoForward] = useState(false);
  // const [currentUrl, setCurrentUrl] = useState(
  //   "https://mohit8820.github.io/mohit.sah/"
  // );

  const backAction = useCallback(() => {
    if (canGoBack && webviewref.current) {
      webviewref.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [backAction]);

  return (
    <>
      <View style={styles.container}></View>
      <WebView
        ref={webviewref}
        source={{ uri: "https://queryex.netlify.app/home" }}
        onLoadProgress={(event) => setCanGoBack(event.nativeEvent.canGoBack)}
        startInLoadingState
        renderLoading={Loading}
        /* source={{ uri: currentUrl }}
        injectedJavaScript={injectedJs}
        onNavigationStateChange={(navState) => {
          console.log(navState);
          setCanGoBack(navState.canGoBack);
          setCanGoForward(navState.canGoForward);
          setCurrentUrl(navState.url);
        }}
        onMessage={(event) => {
          alert("MESSAGE >>>>" + event.nativeEvent.data);
        }}
        // onLoadStart={() => {
        //   console.log("LOAD START ");
        // }}
        // onLoadEnd={() => {
        //   console.log("LOAD END");
        // }}
        // onError={(err) => {
        //   console.log("ERROR ");
        //   console.log(err);
        // }}*/
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 25,
    backgroundColor: "#f8f9f9",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
