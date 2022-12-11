import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import MapView, { Marker, Geojson } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect } from "react";
import app from "../firebase/firebase.config";
import { getDatabase, ref, onValue, set } from "firebase/database";
import * as Location from "expo-location";
const Map = () => {
	const [location, setLocation] = useState(null);
	const [RTL, setRTL] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const firebase = app();
	function storeLocation(user, location) {
		const db = getDatabase();
		const reference = ref(db, "users/" + user + "/location");
		const data = { ...location, timestamp: Date.now() };
		set(reference, data);
		
	}

	useEffect(() => {
		if (location) {
			storeLocation("shahriar", location);
			setTimeout(() => {
				mapRef.current.fitToSuppliedMarkers(["currentLocation"], {
					edgePadding: { top: 500, right: 500, bottom: 500, left: 500 },
				});
			}, 250);
		}
	}, [location]);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			storeLocation("shahriar", location);
			setLocation(location);
		})();
	}, []);
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	console.log(origin, destination)
	const myPlace = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				properties: {},
				geometry: {
					type: "Point",
					coordinates: [20, 90],
				},
			},
		],
	};

	const mapRef = useRef(null);
	useEffect(() => {
		return;
		if (!origin || !destination) return;
		// Zoom and fit to markers
		mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
			edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
		});
	}, [origin, destination]);
	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			initialRegion={{
				// latitude: origin.location.lat,
				// longitude: origin.location.lng,
				latitude: 23.7643517,
				longitude: 90.4286009,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			}}
		>
			<Geojson geojson={myPlace} strokeColor="red" fillColor="green" strokeWidth={2} />
			{origin && destination && (
				<MapViewDirections
					origin={{latitude: origin.location.lat, longitude: origin.location.lng}}
					destination={{ latitude: destination.location.lat, longitude: destination.location.lng }}
					waypoints={[{ latitude: 23.7643517, longitude: 90.4286009 }]}
					// apikey={GOOGLE_MAPS_API_KEY}
					apikey={"AIzaSyB9tPZeakBiWWUw8AD9jDsfLpNZjtE6lU8"}
					strokeWidth={3}
					strokeColor="black"
				/>
			)}
			{location?.coords && (
				<Marker
					coordinate={{ latitude: location?.coords.latitude, longitude: location?.coords.longitude }}
					draggable
					onDragEnd={(e) => {
						const [latitude, longitude] = [e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude];

						const newLocation = { ...location, coords: { ...location.coords, latitude, longitude } };

						setLocation(newLocation);
					}}
					identifier="currentLocation"
					description="Current Location"
				/>
			)}
			{origin?.location && (
				<Marker
					coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{ latitude: destination.location.lat, longitude: destination.location.lng }}
					title="Origin"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});
