import { View, Text } from "react-native";
import React from "react";

import tw from "twrnc";
const Home = () => {
	return (
		<View style={tw`h-full border-2 border-black m-2 bg-red-300`}>
			<Text>This is Home</Text>
		</View>
	);
};

export default Home;
