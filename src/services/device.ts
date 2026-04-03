// @ts-ignore
import * as ImagePicker from 'expo-image-picker';
// @ts-ignore
import * as Location from 'expo-location';

// Выбрать фото из галереи. Возвращает URI или null если отменено.
export async function pickAvatarFromLibrary(): Promise<string | null> {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
        throw new Error('Доступ к галерее не предоставлен.');
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.7,
        allowsEditing: true,
    });
    if (result.canceled || !result.assets.length) return null;
    return result.assets[0].uri;
}

// Определить текущее местоположение и вернуть читаемый адрес.
export async function getCurrentLocationLabel(): Promise<string> {
    const perm = await Location.requestForegroundPermissionsAsync();
    if (!perm.granted) {
        throw new Error('Доступ к геолокации не предоставлен.');
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    const [place] = await Location.reverseGeocodeAsync(coords);
    // Собираем читаемую строку из города и улицы
    return [place.city, place.street].filter(Boolean).join(', ')
        || 'Местоположение определено';
}