import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const URL = "https://api.thecatapi.com/v1/images/search";

const API_KEY = "9f996cd4-6f4a-47ce-a89f-89e5b1429b97";

interface ImageData {
  id: string;
  url: string;
}

export const imageDataFromJson = (json: any): ImageData | undefined => {
  if (
    Array.isArray(json) &&
    json.length > 0 &&
    json[0].id != null &&
    json[0].url != null
  ) {
    return {
      id: json[0].id as string,
      url: json[0].url as string,
    };
  } else {
    return undefined;
  }
};

export default function App() {
  const [imageData, setImageData] = React.useState<ImageData | undefined>(
    undefined
  );

  React.useEffect(() => {
    fetch(URL, { headers: { ["x-api-key"]: API_KEY } })
      .then((response) => response.json())
      .then((json) => {
        setImageData(imageDataFromJson(json));
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{!imageData ? "loading" : imageData.id}</Text>
      {!!imageData && (
        <Image style={styles.image} source={{ uri: imageData.url }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#efefef",
  },
  image: {
    height: 200,
    width: 200,
  },
});
