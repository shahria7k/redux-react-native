import { View, Text } from "react-native";
import { useState } from "react";
import { useEffect } from "react";

const useRTLocation = () => {
	const [geoData, setGeoData] = useState({
		latitude: LATITUDE,
		longitude: LONGITUDE,
		routeCoordinates: [],
		distanceTravelled: 0,
		prevLatLng: {},
		coordinate: new AnimatedRegion({
			latitude: LATITUDE,
			longitude: LONGITUDE,
		}),
	});
	useEffect(() => {
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				const { coordinate, routeCoordinates, distanceTravelled } = this.state;
				const { latitude, longitude } = position.coords;

				const newCoordinate = {
					latitude,
					longitude,
				};
				if (Platform.OS === "android") {
					if (this.marker) {
						this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
					}
				} else {
					coordinate.timing(newCoordinate).start();
				}
				this.setState({
					latitude,
					longitude,
					routeCoordinates: routeCoordinates.concat([newCoordinate]),
					distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
					prevLatLng: newCoordinate,
				});
			},
			(error) => console.log(error),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}, []);
	return (
		<View>
			<Text>useRTLocation</Text>
		</View>
	);
};

export default useRTLocation;
